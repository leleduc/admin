"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MediaForm = ({
  _id: mediaId,
  name: mediaName,
  type: mediaType,
  url: mediaUrl,
  desc: mediaDesc,
}) => {
  const [id, setId] = useState(mediaId || "");
  const [name, setName] = useState(mediaName || "");
  const [type, setType] = useState(mediaType || "");
  const [url, setUrl] = useState(mediaUrl || "");
  const [desc, setDesc] = useState(mediaDesc || "");

  const [goToMedia, setGoToMedia] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { name, type, url, desc };

    if (id) {
      //update
      await axios.put(`/api/media/${id}`, data).then((response) => {
        console.log(response.data);
      });
      setGoToMedia(true);
    } else {
      //create
      await axios.post("/api/media", data).then((response) => {
        console.log(response.data);
      });
      setGoToMedia(true);
    }
  }

  if (goToMedia) {
    router.push("/media");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <label htmlFor="">Type</label>
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type"
      />

      <label htmlFor="">URL</label>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="url"
      />
      <div className="aspect-h-1 aspect-w-1 w-full h-48 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          src={url}
          width={300}
          height={300}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>

      <label htmlFor="">Description</label>
      <textarea
        name=""
        id=""
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
      ></textarea>

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
};

export default MediaForm;
