# Simple Todo App

This repository contains a minimal todo list application with a React frontend and an Express backend.

## Backend

1. `cd backend`
2. `npm install`
3. `npm start`

The backend runs on port 4000 (configurable via `PORT`). It keeps todos in memory and exposes `/todos` endpoints.

## Frontend

1. `cd frontend`
2. `npm install`
3. `npm start`

The frontend uses Create React App conventions and proxies API requests to the backend.

## Notes

- Both services need to run simultaneously for the app to work locally.
- Todos are stored in memory so data resets on restart.
