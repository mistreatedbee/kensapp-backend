# Kens App Backend

This minimal Express + Mongoose backend connects to your MongoDB Atlas instance.

Setup

1. Copy `.env.example` to `.env` and set `MONGODB_URI`.
2. Run `npm install` inside `server/`.
3. Start with `npm start` or `npm run dev`.

Docker

Build and run locally with Docker:

```bash
docker build -t kensapp-backend .
docker run -e MONGODB_URI="$MONGODB_URI" -p 4000:4000 kensapp-backend
```

Render deployment notes

- If you use Render's Docker option it will pick up this `Dockerfile` automatically.
- If you don't use Docker, set the service runtime to Node and set the root to `server`.
- Ensure the `MONGODB_URI` environment variable is set in your Render service settings.

