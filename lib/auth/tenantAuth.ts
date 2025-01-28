export function getTenantDbConfig(tenantName: string) {
  // Return dedicated DB config for the tenant
  return {
    host: process.env[`DB_${tenantName.toUpperCase()}_HOST`],
    user: process.env[`DB_${tenantName.toUpperCase()}_USER`],
    password: process.env[`DB_${tenantName.toUpperCase()}_PASSWORD`],
    port: +process.env[`DB_${tenantName.toUpperCase()}_PORT`]!,
  };
}
