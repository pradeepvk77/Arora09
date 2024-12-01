/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import bucketCollection from "../service/bucket";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { putSinglePost } from "../reduxStore/reducer/authSlice";

export default function HomeBlogCard({ eachPost }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(
    "https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg"
  );

  const title = eachPost["title"].slice(0, 30);
  const content = eachPost.EditorControl.slice(0, 75) || "";
  const author = eachPost.author;
  const createAt = new Date(eachPost.$createdAt)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .toUpperCase();

  async function getImage() {
    const check =
      (await bucketCollection.getImagePrev(eachPost.imageId)) +
      `&timestamp=${Date.now()}`;
    setImageUrl(check);
  }
  const readButton = async () => {
    dispatch(putSinglePost(eachPost));
    navigate("/read_blog/" + eachPost.slug);
  };
  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className=" flex mx-8 mt-4 p-4 border-black border border-opacity-50  bg-black bg-opacity-30 shadow-2xl shadow-purple-900 rounded-2xl">
      <div className="image-container">
        <img
          src={imageUrl}
          className="w-full h-fit rounded-2xl fixed-size-image"
        />
      </div>
      <div className="ml-8 w-3/4">
        <div className="flex justify-between">
          <div className="block  text-2xl font-semibold text-gray-50">
            {title}
          </div>
          <button
            onClick={readButton}
            className="bg-gradient-to-l from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-x-105 duration-300 ease-in-out"
            type="button"
          >
            Read
          </button>
        </div>
        <p className="mt-2 text-xl text-gray-200 dark:text-gray-400">
          {parse(content)}{" "}
        </p>
        <div className=" flex justify-between mt-4   items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                className="object-cover h-10 w-10 rounded-full"
                src="https://cdn.dribbble.com/users/2199928/screenshots/11532918/media/5a7273b592ea860e6d0ff2931ecab4f3.png?resize=400x300&vertical=center"
                alt="Avatar"
              />
              <a href="#" className="mx-2 font-semibold text-gray-50 ">
                {author}
              </a>
            </div>
            <span className="mx-1 mt-1 text-xs text-gray-400 dark:text-gray-300">
              {createAt}
            </span>
          </div>
          <div className=" flex space-x-3">
            <span className="cursor-pointer hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f2f2f2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </span>
            <span className="cursor-pointer hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                mlnsxlink="http://www.w3.org/1999/xlink"
                fill="white"
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                viewBox="0 30 471.701 471.701"
                xmlnsxlink="preserve"
              >
                <g>
                  <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z" />
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="inline-flex flex-wrap items-center gap-3 mt-8 ">
        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"></span>
      </div>
    </div>
  );
}
