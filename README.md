# EverFocus

EverFocus is a full-stack study tracker built with React, TypeScript, Node.js, Express, and Prisma. It combines a Pomodoro timer, study session logging, a to-do list, and a weekly summary dashboard in a single app.

## Features

- Pomodoro timer with start, pause, resume, and reset controls
- Manual session logging with subject, category, and duration
- Weekly 7-day summary with total study time and streak tracking
- To-do list with browser persistence
- Retro-inspired nature-themed interface

## Tech Stack

- Frontend: React, TypeScript, Vite, Recharts
- Backend: Node.js, Express, Prisma
- Database: SQLite
- Styling: Custom CSS

## Data Storage

- Study sessions are saved through the backend API and stored in the SQLite database via Prisma.
- The to-do list is stored in browser `localStorage`.
- The app uses a persistent browser-generated user ID so sessions and summaries stay linked without authentication.

## Project Structure

```text
smart-study-tracker/
  smart-study-tracker-frontend/
  smart-study-tracker-backend/
```

## Running The Project

1. Clone the repository.

```bash
git clone https://github.com/james-panlilio/EverFocus.git
cd EverFocus
```

2. Install dependencies for both apps.

```bash
cd smart-study-tracker-frontend
npm install

cd ../smart-study-tracker-backend
npm install
```

3. Start the backend.

```bash
npm run dev
```

4. Start the frontend in a second terminal.

```bash
cd ../smart-study-tracker-frontend
npm run dev
```

5. Open `http://localhost:5173`.

## Current Scope

This project is complete as a portfolio-ready MVP. Planned future improvements include authentication, cloud deployment, and deeper analytics.
