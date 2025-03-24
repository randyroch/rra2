# Room Readiness App

An interactive web app for cable installation techs to fill out the Room Readiness Assessment form.

## Project Structure

- `/frontend`: React app (Vercel deployable)
- `/backend`: FastAPI service for generating Excel form (Render deployable)

## Setup

### Frontend (Vercel)
1. Go to https://vercel.com
2. Import this repo, select `/frontend` as project root
3. Set framework to React
4. Click **Deploy**

### Backend (Render)
1. Go to https://render.com
2. Create new web service
3. Connect this repo, select `/backend` as root
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port 10000`
5. Set environment: Python 3.11, add packages from `requirements.txt`
6. Click **Deploy**

### Important
- Place the Excel template `QS16450 Rev 4 single page room readiness form.xlsx` into `/backend`
- Ensure CORS is enabled on the backend for cross-origin requests from Vercel

## Done!
You can now share your Vercel frontend link with technicians.