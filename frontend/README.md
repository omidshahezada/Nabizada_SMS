# Nabizada SMS React frontend

React 19 and Vite SPA for the Laravel application in `../Nabizada_SMS`. It includes dashboard, products, customers, sales and invoices, finance, user administration, company settings, and profile/account management.

## Local setup

Requirements: Node.js 20.19+ (or 22.12+) and npm.

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The default environment points to Laravel on port 8000:

```dotenv
VITE_API_BASE_URL=http://localhost:8000
```

Start Laravel first and open the Vite URL (`http://localhost:5173`). Authentication is cookie-based: the client requests `/sanctum/csrf-cookie`, sends credentials with every API call, and forwards Laravel's XSRF token. If either server uses `127.0.0.1`, update both projects' environment values consistently.

## Production check

```powershell
npm run lint
npm run build
```

The production files are written to `dist/`. Configure the deployed Laravel `APP_URL`, frontend base URL, CORS origins, Sanctum stateful domains, cookie domain, and HTTPS cookie settings for the real domains.
