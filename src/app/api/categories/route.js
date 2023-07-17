import category from '@/models/category';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export const GET = async (request, response) => {
    const url = new URL(request.url);

    try {
        await connect();

        const categories = await category.find().populate('parent');

        return new NextResponse(JSON.stringify(categories), { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};

export const POST = async (request) => {
    const body = await request.json();

    try {
        await connect();
        const newCategory = new category({
            name: body.name,
            parent: body.parent || undefined,

        });

        await newCategory.save();

        return new NextResponse('Category has been created ' + body.parent, { status: 201 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};

export const PUT = async (request) => {
    const body = await request.json();

    // const { name, parent, _id } = data;
    if (!body) {
        return res.status(400).send({ message: 'Data to update is empty' });
    }

    try {

        await connect();
        await category.findByIdAndUpdate(body._id, {
            name: body.name,
            parent: body.parentCategory || null,

        }, {
            useFindAndModify: false,
        });

        return new NextResponse(`Category has been updated ${body.parentCategory}`, { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error' + body._id, { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { id } = params.id;

    try {
        await connect();

        await category.findByIdAndDelete(id);

        return new NextResponse(`Product has been deleted ${_id}`, { status: 200 });
    } catch (err) {
        return new NextResponse(`Database Error ${_id}`, { status: 500 });
    }
};
