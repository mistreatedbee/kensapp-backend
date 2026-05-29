# Kenmok CC Backend

Express and MongoDB API for the Kenmok CC storefront and admin dashboard.

## Local Setup

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and Cloudinary credentials.
3. Set `CLIENT_ORIGIN=http://localhost:5173` for local development.
4. Run `npm install`.
5. Start with `npm start` or `npm run dev`.

The first admin user is created automatically from `ADMIN_EMAIL` and `ADMIN_PASSWORD` when the server connects to MongoDB.

## Required Environment Variables

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME`
- `CLIENT_ORIGIN`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Render Deployment

Use the included `render.yaml` or create a Node web service with root set to `server`.
Set all required environment variables in Render, then set the frontend `VITE_API_URL` to the Render service URL in Vercel.
For production CORS, set Render's `CLIENT_ORIGIN` value to `https://kens-app.vercel.app` or a comma-separated list such as `http://localhost:5173,https://kens-app.vercel.app`.
