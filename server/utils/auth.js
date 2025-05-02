import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '2d' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res
      .status(401)
      .json({ error: 'No token provided. Authentication required.' });
  }
  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: 'Invalid token. Please provide a valid token for authentication.' });
  }
};
