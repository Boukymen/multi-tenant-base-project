1. src/

- components/
  - TenantLoginForm.tsx
  - UserManagement.tsx
- pages/
  - index.tsx (Main login page)
  - tenant/[tenantName]/dashboard.tsx
- lib/
  - drizzle/
    - schema.ts
    - db.ts
    - tenantManager.ts
  - auth/
    - authProvider.ts
  - utils/
    - config.ts
- server/
  - api/
    - tenants.ts
    - users.ts
- middleware/
  - tenantMiddleware.ts
- types/
  - tenant.d.ts
  - user.d.ts
- .env

2. package.json
3. tsconfig.json
4. drizzle.config.ts
   \*/
