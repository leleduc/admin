'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProductForm = ({
  _id: productId,
  name: productName,
  desc: productDesc,
  price: productPrice,
}) => {
  // const id = productId;
  const [id, setId] = useState(productId || '');
  const [name, setName] = useState(productName || '');
  const [desc, setDesc] = useState(
    productDesc || ''
  );
  const [price, setPrice] = useState(productPrice || '');

  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  // console.log(productId);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {name, desc, price};

    if (id) {
      //update
      await axios.put(`/api/products/${id}`, data).then((response) => {
        console.log(response.data);
      });
      setGoToProducts(true);
    } else {
      //create
      await axios.post('/api/products', data).then((response) => {
        console.log(response.data);
      });
      setGoToProducts(true);
    }
  }

  if (goToProducts) {
    router.push('/products');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Product name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
      />
      <label htmlFor="">Description</label>
      <textarea
        name=""
        id=""
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
      ></textarea>
      <label htmlFor="">Price (USD)</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
