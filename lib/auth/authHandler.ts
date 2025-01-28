import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key';

export const generateToken = (user: {
  id: string;
  email: string;
  tenantId: string;
}) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    throw new Error('Invalid or expired token');
  }
};

//2. src/lib/auth/authProvider.ts
