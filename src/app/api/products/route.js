import product from '@/models/product';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export const GET = async (request, response) => {
  const url = new URL(request.url);

  try {
    await connect();

    const products = await product.find();

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newProduct = new product(body);

  try {
    await connect();

    await newProduct.save();

    return new NextResponse('Post has been created', { status: 201 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};
