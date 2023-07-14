"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Media = () => {
  const [media, setMedia] = useState([]);
  useEffect(() => {
    axios.get("/api/media").then((response) => {
      setMedia(response.data);
    });
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h1 className="mb-0">Media Library</h1>
        <Link href="/media/add" className="btn-primary">
          Add New Media
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center  justify-between border rounded-lg mb-4">
          <div className="px-2 py-4 gap-2">
            <select id="type-filters">
              <option value="all">All media items</option>
              <option value="image">Images</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>

            <select id="date-filters" className="">
              <option value="all">All dates</option>
              <option value="0">July 2023</option>
            </select>

            <button className="btn-primary ml-2">Filter</button>
            <span className="spinner"></span>
          </div>

          <div className="flex items-center">
            <label for="search-input" className="btn-primary">
              Search
            </label>
            <input
              type="search"
              id="media-search-input"
              className="h-8 mr-2 mb-0 w-32"
            />
          </div>
        </div>

        {/* <div className="border mb-2 rounded-lg">
          <ul tabindex="-1" className="grid grid-cols-4 gap-4">
            {media.map((item) => (
              <li
                tabindex="0"
                role="checkbox"
                aria-label="Resume-Le-Anh"
                aria-checked="false"
                key={item._id}
                className="attachment save-ready"
              >
                <div className="attachment-preview js--select-attachment type-application subtype-pdf landscape">
                  <div className="thumbnail">
                    <div className="centered">
                      <Image
                        src=""
                        className="thumbnail"
                        draggable="false"
                        alt=""
                      />
                    </div>
                    <div className="filename">
                      <div>Resume-Le-Anh.pdf</div>
                    </div>
                  </div>
                </div>

                <button type="button" className="check" tabindex="-1">
                  <span className="media-modal-icon"></span>
                  <span className="screen-reader-text">Deselect </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="load-more-wrapper">
            <span className="spinner"></span>
            <p className="load-more-count">Showing 4 of 4 media items</p>
            <button
              type="button"
              className="button load-more hidden button-primary"
            >
              Load more
            </button>
            <button
              type="button"
              className="button load-more-jump hidden"
              disabled=""
            >
              Jump to first loaded item
            </button>
          </div>
        </div> */}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {media.map((item) => (
            <div key={item._id} href={item.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full h-48 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                  src={item.url}
                  width={300}
                  height={300}
                  alt={item.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div>
                <div>
                  <h3 className="w-full text-center  my-2  text-lg font-medium text-gray-900">
                    {item.name}
                  </h3>
                </div>
                <div className="flex justify-center ">
                  <Link
                    className="btn-primary"
                    href={`/media/${item._id}/edit`}
                  >
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Edit
                  </Link>
                  <Link
                    className="btn-primary"
                    href={`/media/${item._id}/delete`}
                  >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;
