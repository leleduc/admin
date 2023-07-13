'use client';
import axios from 'axios';
import React, { useState } from 'react';

const ProductNew = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { name, description, price };

    await axios.post('/api/products', data).then((response) => {
      console.log(response.data);
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>New Product</h1>
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
    </div>
  );
};

export default ProductNew;
ProductNew;
