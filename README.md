# EverFocus

EverFocus is a smart, minimal full-stack study tracker built with React, TypeScript, Node.js, Express, and Prisma. It combines a Pomodoro timer, session logging, a to-do list, and a weekly summary dashboard in one retro-inspired productivity app.

## Features

### Pomodoro And Session Tracking

- Start, pause, resume, and reset focus sessions
- Log study sessions with subject, category, and duration
- Use quick duration presets for common study lengths
- Save session data to the backend and reflect it in the weekly summary

### To-Do List

- Add, complete, and delete tasks
- Store tasks in browser `localStorage`
- Use a custom leaf icon to mark completed items

### Weekly Summary

- View total study time across the last 7 days
- See daily progress in a bar chart
- Track your current study streak

### Design

- Retro-inspired nature aesthetic
- Custom CSS styling with a calm colour palette
- Focused, lightweight single-page experience

## Tech Stack

| Area | Technology |
|------|------------|
| Frontend | React, TypeScript, Vite, Recharts |
| Backend | Node.js, Express, Prisma |
| Database | SQLite |
| Styling | Custom CSS |

## Data Storage

- Study sessions are sent through the backend API and stored in SQLite via Prisma.
- The to-do list is stored in browser `localStorage`.
- The app uses a persistent browser-generated user ID so sessions and summaries stay linked without authentication.

## Project Structure

```text
EverFocus/
  README.md
  smart-study-tracker-frontend/
  smart-study-tracker-backend/
```

## Running The Project

1. Clone the repository.

```bash
git clone https://github.com/james-panlilio/EverFocus.git
cd EverFocus
```

2. Install frontend dependencies.

```bash
cd smart-study-tracker-frontend
npm install
```

3. Install backend dependencies.

```bash
cd ../smart-study-tracker-backend
npm install
```

4. Start the backend.

```bash
npm run dev
```

5. Start the frontend in a second terminal.

```bash
cd ../smart-study-tracker-frontend
npm run dev
```

6. Open `http://localhost:5173`.

## Project Overview

EverFocus is a portfolio-ready MVP built to help students manage focused study time in a clean and motivating interface. It brings together time tracking, task management, and weekly progress analytics in one app.

## Future Improvements

- User authentication and account-based syncing
- Cloud database deployment
- Calendar integration
- Expanded analytics and trend tracking
- Theme customisation

## Author

James Panlilio  
BSc Computer Science, University of Surrey
