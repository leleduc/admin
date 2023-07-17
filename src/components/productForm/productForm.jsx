"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductForm = ({
  _id: productId,
  name: productName,
  desc: productDesc,
  price: productPrice,
  images,
}) => {
  // const id = productId;
  const [id, setId] = useState(productId || "");
  const [name, setName] = useState(productName || "");
  const [desc, setDesc] = useState(productDesc || "");
  const [price, setPrice] = useState(productPrice || "");

  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  // console.log(productId);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { name, desc, price };

    if (id) {
      //update
      await axios.put(`/api/products/${id}`, data).then((response) => {
        console.log(response.data);
      });
      setGoToProducts(true);
    } else {
      //create
      await axios.post("/api/products", data).then((response) => {
        console.log(response.data);
      });
      setGoToProducts(true);
    }
  }

  if (goToProducts) {
    router.push("/products");
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
      <label htmlFor="">Photos</label>

      <div className="mb-2">
        <label className="cursor-pointer w-24 h-24 border bg-gray-200 text-center text-sm text-gray-500 flex flex-col items-center justify-center rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
          <input type="text" className="hidden" />
        </label>
        {!images?.length && <div>No photos in this product!</div>}
      </div>

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
