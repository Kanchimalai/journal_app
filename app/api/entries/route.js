import dbConnect from '@/app/lib/dbConnect';
import Entry from '@/app/models/Entry';
import Category from '@/app/models/Category';
import { getUserFromRequest } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

// GET all entries for the logged-in user with filtering
export async function GET(req) {
    try {
        const user = await getUserFromRequest(req);
        if (!user) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }
        await dbConnect();
        
        const { searchParams } = new URL(req.url);
        const categoryFilter = searchParams.get('category');
        const searchFilter = searchParams.get('search');

        let query = { user: user._id };
        
        if (categoryFilter) {
            query.categories = categoryFilter;
        }

        if (searchFilter) {
            query.title = { $regex: searchFilter, $options: 'i' };
        }

        const entries = await Entry.find(query)
            .populate('categories', 'name')
            .sort({ date: -1 });

        return NextResponse.json(entries, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}


// POST a new entry
export async function POST(req) {
    try {
        const user = await getUserFromRequest(req);
        if (!user) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }
        await dbConnect();

        const { title, content, date, categoryNames } = await req.json();
        
        // Find or create categories and get their IDs
        const categoryIds = await Promise.all(
            (categoryNames || []).map(async (name) => {
                let category = await Category.findOne({ name: name.trim(), user: user._id });
                if (!category) {
                    category = await Category.create({ name: name.trim(), user: user._id });
                }
                return category._id;
            })
        );
        
        const entry = await Entry.create({
            title,
            content,
            date,
            user: user._id,
            categories: categoryIds,
        });

        const populatedEntry = await Entry.findById(entry._id).populate('categories', 'name');

        return NextResponse.json(populatedEntry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}