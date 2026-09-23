# Kopun Finance Manager Online v4 — migration foundation

This package converts the project from a single browser-only file into an online-ready structure with:

- Express API backend
- PostgreSQL database schema
- server-side password hashing (bcrypt)
- JWT sessions
- business/tenant isolation through `business_id`
- role-aware protected routes
- tables for users, customers, applications, loans, payments, expenses, documents and audit logs
- the original v3 offline application preserved as `public/legacy-offline.html`

## Important status
The backend foundation is working, but the large legacy v3 interface still uses browser `localStorage`. It is preserved so no features are lost. Each legacy screen must now be migrated to the API endpoints before using this as a real finance SaaS. Do not use the legacy page for shared production financial records.

## Run locally
1. Install Node.js 20+ and PostgreSQL.
2. Create a PostgreSQL database.
3. Run `sql/schema.sql` in that database.
4. Copy `.env.example` to `.env` and set `DATABASE_URL` and a long random `JWT_SECRET`.
5. Run `npm install`.
6. Run `npm start`.
7. Open `http://localhost:3000`.

## Deployment
Push this folder to a private GitHub repository. Deploy the Node app to a service that supports Node.js and PostgreSQL (for example Render/Railway/Fly.io or another provider). Configure `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`, and `PORT` in the host's environment settings.

## Next migration order
1. Authentication and company settings
2. Customers
3. Loan applications
4. Loans and repayment schedules
5. Repayments/receipts
6. Expenses and cashbook
7. Statements/reports
8. Documents using private object storage (do not store sensitive PDFs as public files)
9. Audit trail and staff management
10. Subscription/billing

## Security work still required before public production
- CSRF/session strategy review; consider secure HttpOnly cookies rather than localStorage JWTs.
- Request validation (e.g. Zod/Joi), rate limiting, account lockout/MFA as appropriate.
- Private object storage with signed URLs and malware/file-type checks.
- Strong tenant-isolation tests on every endpoint.
- Database migrations, encrypted backups, restore drills, monitoring and logs.
- Financial calculation test suite and legal/compliance review for the jurisdictions where the system will operate.
- Do not commit `.env`, database passwords, JWT secrets or customer data to GitHub.
