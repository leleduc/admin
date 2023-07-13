"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductDelete = ({ params }) => {
  const router = useRouter();
  const [productData, setProductData] = useState(null);

  const id = params.id;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/api/products/${id}`).then((response) => {
      setProductData(response.data);
    });
  }, [id]);

  async function deleteProduct() {
    // console.log(id);
    await axios.delete(`/api/products/${id}`).then((response) => {
      setProductData(response.data);
    });
    goBack();
  }

  function goBack() {
    router.push("/products");
  }
  return (
    <div>
      <h1 className="text-center">
        Do you really want to deleted product &quot;{productData?.name}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </div>
  );
};

export default ProductDelete;
