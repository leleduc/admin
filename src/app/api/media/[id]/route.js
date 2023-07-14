import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import media from '@/models/media';

export const GET = async (request, { params }) => {
    const { id } = params;

    try {
        await connect();

        const Media = await media.findById(id);

        return new NextResponse(JSON.stringify(Media), { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    const { id } = params;

    const data = await request.json();
    const { name, type, url, desc } = data;
    if (!request.body) {
        return res.status(400).send({ message: 'Data to update is empty' });
    }

    try {

        await connect();
        await media.findByIdAndUpdate(id, data, {
            useFindAndModify: false,
        });

        return new NextResponse(`Media has been updated ${id}`, { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { id } = params;

    try {
        await connect();

        await media.findByIdAndDelete(id);

        return new NextResponse(`Product has been deleted ${id}`, { status: 200 });
    } catch (err) {
        return new NextResponse(`Database Error ${id}`, { status: 500 });
    }
};
