import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    res.status(404).json('User not found');
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).json('Invalid password');
    return;
  }
  
  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'default_secret', {
    expiresIn: '1h',
  });
  return res.json({token});
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
