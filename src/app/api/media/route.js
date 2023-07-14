import media from "@/models/media";
import connect from '@/utils/db';
import { NextResponse } from 'next/server';


export const GET = async (request, response) => {
    const url = new URL(request.url);

    try {
        await connect();

        const Media = await media.find();

        return new NextResponse(JSON.stringify(Media), { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};


export const POST = async (request) => {
    const body = await request.json();

    const newMedia = new media(body);

    try {
        await connect();

        await newMedia.save();

        return new NextResponse('Media has been created', { status: 201 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};