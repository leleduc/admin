"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MediaDelete = ({ params }) => {
  const router = useRouter();
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

  async function deleteMedia() {
    // console.log(id);
    await axios.delete(`/api/media/${id}`).then((response) => {
      setMediaData(response.data);
    });
    goBack();
  }

  function goBack() {
    router.push("/media");
  }
  return (
    <div>
      <h1 className="text-center">
        Do you really want to deleted &quot;{mediaData?.name}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteMedia}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </div>
  );
};

export default MediaDelete;
