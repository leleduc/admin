import { NextResponse } from 'next/server';
import connect from '@/utils/db';

import category from '@/models/category';

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    const Product = await category.findById(id);

    return new NextResponse(JSON.stringify(Product), { status: 200 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  // const {name,desc,price} = await request.json();
  const data = await request.json();
  const { name, desc, price } = data;
  if (!request.body) {
    return res.status(400).send({ message: 'Data to update is empty' });
  }

  try {
    await connect();
    await category.findByIdAndUpdate(id, data, {
      useFindAndModify: false,
    });

    return new NextResponse(`Product has been updated ${id}`, { status: 200 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await category.findByIdAndDelete(id);

    return new NextResponse(`Product has been deleted ${id}`, { status: 200 });
  } catch (err) {
    return new NextResponse(`Database Error ${id}`, { status: 500 });
  }
};
