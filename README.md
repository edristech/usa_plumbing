# USA Plumbing Service

## Requirements

- Node.js 20 or newer
- PostgreSQL

Copy `.env.example` to `.env` and set these values. Never commit `.env`.

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=use_a_long_random_secret_at_least_32_characters
VITE_API_URL=http://localhost:3001
FRONTEND_ORIGIN=http://localhost:5173
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
PORT=3001
```

`DATABASE_URL` and `JWT_SECRET` are server-only values. `VITE_API_URL` is a public frontend API address and must not contain credentials.

## Local startup

1. Start PostgreSQL and create the database named in `DATABASE_URL`.
2. Initialize the idempotent schema:

	```powershell
	npm run db:init
	```

3. Create the first administrator. The password is hashed and never displayed or stored as plaintext:

	```powershell
	npm run admin:create
	```

4. Start the backend:

	```powershell
	npm run server
	```

5. In a second terminal, start the frontend:

	```powershell
	npm run dev
	```

Open the Vite URL followed by `/admin/login` to access the dashboard.

## Validation

```powershell
npm run lint
npm run build
npm audit --audit-level=high
```

The backend exposes public health checks at `/api/health` and `/api/health/db`. Admin APIs use an HTTP-only JWT cookie and require authentication.
