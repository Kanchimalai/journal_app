import dbConnect from '@/app/lib/dbConnect';
import Entry from '@/app/models/Entry';
import Category from '@/app/models/Category';
import { getUserFromRequest } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

// GET a single entry by ID
export async function GET(req, { params }) {
    try {
        const user = await getUserFromRequest(req);
        if (!user) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }
        await dbConnect();
        const entry = await Entry.findOne({ _id: params.id, user: user._id }).populate('categories', 'name');
        
        if (!entry) {
            return NextResponse.json({ message: 'Entry not found' }, { status: 404 });
        }
        
        return NextResponse.json(entry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}

// PUT (update) an entry
export async function PUT(req, { params }) {
    try {
        const user = await getUserFromRequest(req);
        if (!user) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }
        await dbConnect();
        const { title, content, date, categoryNames } = await req.json();

        const categoryIds = await Promise.all(
            (categoryNames || []).map(async (name) => {
                let category = await Category.findOne({ name: name.trim(), user: user._id });
                if (!category) {
                    category = await Category.create({ name: name.trim(), user: user._id });
                }
                return category._id;
            })
        );

        const updatedEntry = await Entry.findOneAndUpdate(
            { _id: params.id, user: user._id },
            { title, content, date, categories: categoryIds },
            { new: true, runValidators: true }
        ).populate('categories', 'name');

        if (!updatedEntry) {
            return NextResponse.json({ message: 'Entry not found' }, { status: 404 });
        }

        return NextResponse.json(updatedEntry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}

// DELETE an entry
export async function DELETE(req, { params }) {
    try {
        const user = await getUserFromRequest(req);
        if (!user) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }
        await dbConnect();
        const deletedEntry = await Entry.findOneAndDelete({ _id: params.id, user: user._id });
        
        if (!deletedEntry) {
            return NextResponse.json({ message: 'Entry not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Entry deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}