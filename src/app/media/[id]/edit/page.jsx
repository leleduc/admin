"use client";
import MediaForm from "@/components/mediaForm/mediaForm";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MediaEdit = ({ params }) => {
  const [mediaData, setMediaData] = useState(null);

  const id = params.id;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/api/media/${id}`).then((response) => {
      setMediaData(response.data);
    });
  }, [id]);

  return (
    <div>
      <h1>Edit Product</h1>
      {mediaData && <MediaForm {...mediaData} />}
    </div>
  );
};

export default MediaEdit;
