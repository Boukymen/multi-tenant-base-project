export const config = {
  adminDbUrl: process.env.ADMIN_DB_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'default_secret_key',
};
