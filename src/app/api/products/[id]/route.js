import { NextResponse } from 'next/server';
import connect from '@/utils/db';

import product from '@/models/product';

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    const Product = await product.findById(id);

    return new NextResponse(JSON.stringify(Product), { status: 200 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};

export const UPDATE = async (request, { params }) => {
  const { id } = params;
  if (!request.body) {
    return res.status(400).send({ message: 'Data to update is empty' });
  }

  try {
    await connect();

    await product.findByIdAndUpdate(id, request.body, {
      useFindAndModify: false,
    });

    return new NextResponse('Product has been deleted', { status: 200 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await product.findByIdAndDelete(id);

    return new NextResponse('Product has been deleted', { status: 200 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};
