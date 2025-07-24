# Task Manager

## Notes
- Frontend was initialized by:
    - `npm create vite@latest frontend -- --template react-ts`
- Backend was initialied by:
    - `npm init`
    - `npm install typescript --save-dev`
    - `npx tsc`
- `.env` files would normally not be included in repository to prevent revealing secrets

## Run Docker Containers
- For development
    - `docker compose --profile dev up --build`
- For production
    - `docker compose --profile prod up --build`

## Access App
 - http://localhost:8080
 