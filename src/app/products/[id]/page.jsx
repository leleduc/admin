'use client';
import ProductForm from '@/components/productForm/productForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProductEdit = ({ params }) => {
  const [productData, setproductData] = useState(null);

  const id = params.id;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/api/products/${id}`).then((response) => {
      setproductData(response.data);
    });
  }, [id]);

  return (
    <div>
      <h1>Edit Product</h1>
      {productData && <ProductForm {...productData} />}
    </div>
  );
};

export default ProductEdit;
