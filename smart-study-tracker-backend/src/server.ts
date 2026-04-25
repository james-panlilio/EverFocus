import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { buildWeeklySummary } from "./analytics";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// health check
app.get("/health", (_, res) => res.json({ ok: true }));

// --- Sessions API ---
app.get("/api/sessions", async (req, res) => {
  const userId = typeof req.query.userId === "string" ? req.query.userId : "";
  const sessions = await prisma.session.findMany({
    where: userId ? { userId } : {},
    orderBy: { startedAt: "desc" },
  });

  res.json(sessions);
});


const SessionIn = z.object({
  userId: z.string().min(1),
  subject: z.string().min(1),
  category: z.string().optional(),
  startedAt: z.string(),
  endedAt: z.string(),
  durationMin: z.number().int().nonnegative(),
  notes: z.string().optional(),
});

app.post("/api/sessions", async (req, res) => {
  const parsed = SessionIn.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());
  const data = parsed.data;

  try {
    // ensure a user exists for this userId
    await prisma.user.upsert({
      where: { id: data.userId },
      update: {},
      create: { id: data.userId, email: `${data.userId}@example.com` },
    });

    const created = await prisma.session.create({
      data: {
        userId: data.userId,
        subject: data.subject,
        category: data.category,
        startedAt: new Date(data.startedAt),
        endedAt: new Date(data.endedAt),
        durationMin: data.durationMin,
        notes: data.notes,
      },
    });

    res.status(201).json(created);
  } catch (e: any) {
    console.error("Create session error:", e);
    res.status(500).json({ error: "Failed to create session", detail: String(e?.message || e) });
  }
});


app.delete("/api/sessions/:id", async (req, res) => {
  await prisma.session.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

app.get("/api/analytics/summary", async (req, res) => {
  const userId = typeof req.query.userId === "string" ? req.query.userId : "";
  const from = new Date();
  from.setHours(0, 0, 0, 0);
  from.setDate(from.getDate() - 6);

  const sessions = await prisma.session.findMany({
    where: { userId, startedAt: { gte: from } },
  });

  res.json(buildWeeklySummary(sessions));
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`✅ API running on http://localhost:${port}`));
