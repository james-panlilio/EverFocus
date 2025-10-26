# 🌿 EverFocus

EverFocus is a smart, minimalistic study tracker built with **React + TypeScript** and **Node.js (Express + Prisma)**.  
It combines a **Pomodoro timer**, **session logging**, **to-do list**, and **weekly progress summary** — all designed with a clean, retro-inspired nature aesthetic.

---

## ✨ Features

🕒 Pomodoro & Session Tracker
- Start, pause, and resume focus sessions with an intuitive timer.  
- Automatically log study sessions with subject, category, and duration.  
- Quick presets for 15, 25, 45, and 60-minute sessions.  
- Session data is saved locally and reflected in weekly summaries.

🌱 To-Do List
- Add, check off, and delete tasks seamlessly.  
- Each task uses a dynamic **leaf icon** 🌿 that turns green when completed.  
- All data is saved using browser localStorage for persistence.

📊 Weekly Summary
- Displays your total minutes studied over the past 7 days.  
- Includes a **bar chart** visualising your consistency and progress.

🎨 Design & Aesthetic
- Calming, nature-inspired palette with soft gradients.  
- Pixel-style typography using **Pixelify Sans**.  
- Hover animations, subtle shadows, and cohesive theme built for focus.

---

## 🧩 Tech Stack

| Area | Technology |
|------|-------------|
| **Frontend** | React (Vite + TypeScript), CSS3 |
| **Backend** | Node.js, Express, Prisma ORM |
| **Database** | SQLite (development), configurable to PostgreSQL |
| **Styling** | Custom CSS with retro/nature theming |
| **Icons & Fonts** | Boxicons, Google Fonts (Pixelify Sans) |

---

## 🧠 Project Overview

EverFocus is a productivity web app designed to help students and professionals structure their study time efficiently while keeping the interface enjoyable and stress-free.

It builds upon the foundations of my earlier project **Evergreen**, evolving the retro-nature theme into a more functional and modular productivity tool.

---

## 🚀 Running the Project

1️⃣ Clone this repository
git clone https://github.com/james-panlilio/EverFocus.git
cd EverFocus

2️⃣ Install dependencies

For both frontend and backend:
```
cd smart-study-tracker-frontend
npm install

cd ../smart-study-tracker-backend
npm install
```
3️⃣ Run the backend
```
npm run dev
```
4️⃣ Run the frontend
```
cd ../smart-study-tracker-frontend
npm run dev
```
5️⃣ Then open your Browser and go to:
http://localhost:5173

🧑‍💻 Author

James Panlilio
BSc Computer Science — University of Surrey (2nd Year Student)
📍 Focused on full-stack web development, UI/UX, and data-driven productivity tools.

🌿 Inspiration

EverFocus is built as the successor to my earlier project Evergreen, which featured a simple retro productivity interface.
This project evolves that idea into a complete study ecosystem — combining productivity with aesthetics to make focus feel rewarding.

🚀 Future Improvements

- User authentication with account-based session syncing
- Calendar integration for visualising study habits
- Dark mode toggle / customisable themes
- Cloud database deployment via Supabase or PostgreSQL
- Analytics dashboard for focus streaks and task trends

📄 License

This project is released under the MIT License — feel free to use, modify, and build upon it for educational or personal purposes.

