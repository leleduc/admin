'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('/api/products').then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      <Link
        className="bg-blue-900 text-white rounded-md py-1 px-2"
        href={'/products/new'}
      >
        Add new product
      </Link>
      <table className="basic">
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>button</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
