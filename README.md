# Task Manager

## Notes
- Frontend was initialized by:
    - `npm create vite@latest frontend -- --template react-ts`
- Backend was initialied by:
    - `npm init`
    - `npm install typescript --save-dev`
    - `npx tsc`
- `.env` files would normally not be included in repository to prevent revealing secrets

## Postman
- https://web.postman.co/workspace/My-Workspace~77e80d02-b357-4a1b-876c-c89a8d8e8af2/collection/19365444-4beb7995-5e72-40d0-a4aa-1d4a1c33a36e?action=share&source=copy-link&creator=19365444
- Postman Collection JSON is located in project root

## Run Docker Containers
- For development
    - `docker compose --profile dev up --build`
- For production
    - `docker compose --profile prod up --build`

## Access App
 - http://localhost:8080
 