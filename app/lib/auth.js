import { jwtVerify } from 'jose';
import dbConnect from './dbConnect';
import User from '../models/User';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getUserIdFromToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.id;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

export async function getUserFromRequest(req) {
  try {
    await dbConnect();
    const token = req.cookies.get('token')?.value;
    if (!token) {
      console.error('No token found in cookies');
      return null;
    }
    const userId = await getUserIdFromToken(token);
    if (!userId) {
      console.error('No userId found from token');
      return null;
    }
    const user = await User.findById(userId).select('-password');
    if (!user) {
      console.error('No user found for userId:', userId);
      return null;
    }
    return user;
  } catch (error) {
    console.error('Error in getUserFromRequest:', error);
    return null;
  }
}