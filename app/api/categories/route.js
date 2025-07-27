import dbConnect from '@/app/lib/dbConnect';
import Category from '@/app/models/Category';
import { getUserFromRequest } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    await dbConnect();
    const categories = await Category.find({ user: user._id }).sort({ name: 1 });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    await dbConnect();
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ message: 'Category name is required' }, { status: 400 });
    }
    
    // Check if category already exists for this user
    const existingCategory = await Category.findOne({ name, user: user._id });
    if (existingCategory) {
        return NextResponse.json(existingCategory, { status: 200 });
    }

    const category = await Category.create({ name, user: user._id });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
     return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}