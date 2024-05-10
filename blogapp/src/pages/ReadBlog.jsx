import React, { useEffect, useState } from "react";
import parse from 'html-react-parser'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import databaseCollection from "../service/database";
import bucketCollection from "../service/bucket";
import editIcon from '../../assest/svg/eidtsvg.svg'
import deleteIcon from '../../assest/svg/deletesvg.svg'

export default function () {
    const navigate = useNavigate();
    const eachPost = useSelector((state) => (state.getSinglePost))
    const status = useSelector((state) => (state.status));
    const userData = useSelector((state) => (state.userData))
    const [imageurl, setImageurl] = useState('https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg')
    const flagOwner = eachPost.authorId === userData.$id ? true : false
    const title = eachPost.title;
    const content = eachPost.EditorControl;
    const author = eachPost.author;
    const createAt = new Date(eachPost.$createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    }).toUpperCase();

    const deletePost = async () => {
        await bucketCollection.deleteImage(eachPost.imageId);
        await databaseCollection.deletePostData(eachPost.$id);
        navigate('/home')
    }

    const updatePost = () => {
        navigate('/editform/' + eachPost.$id)
    }
    async function getImage() {
        const check = await bucketCollection.getImagePrev(eachPost.imageId) + `&timestamp=${Date.now()}`;
        setImageurl(check)
    }

    useEffect(()=>{
        if(!status) navigate('/home')
        getImage();
    },[])
    return (
        <div className="flex flex-col flex-wrap justify-center mx-auto my-4 rounded-lg shadow-lg shadow-black items-center bg-purple-500 bg-opacity-20 w-4/5">
            <div className="flex w-full flex-row justify-center">
                <div className="text-4xl font-semibold mt-6 ">{title}
                </div>
            </div>
                { flagOwner ? (<div className="self-end flex pr-4 space-x-2 ">
                    <button onClick={updatePost} className="hover:bg-gray-400 rounded-full  transform transition hover:scale-110 duration-300 ease-in-out p-2"><img src={editIcon} alt="" /></button>
                    <button onClick={deletePost} className="hover:bg-gray-400 rounded-full  transform transition hover:scale-110 duration-300 ease-in-out p-2"><img src={deleteIcon} alt="" /></button>
                </div> ) : (<div className="mt-4"></div>)}
            <div className="rounded-lg m-4 w-3/5 overflow-hidden">
                <img src={imageurl} alt="" />
            </div>
            <div className="flex w-full justify-between px-4 py-2">
                <div className='flex items-center'>
                    <div className="flex items-center font-semibold text-gray-50">
                        -
                        <a href="#" className="mx-2 font-semibold text-gray-50 ">{author}</a>
                    </div>
                    <span className="mx-1 mt-1 text-xs text-gray-400 dark:text-gray-300">{createAt}</span>
                </div>
                <div className=' flex space-x-3'>
                    <span className="cursor-pointer hover:scale-110"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f2f2f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                    </span>
                    <span className='cursor-pointer hover:scale-110'>
                        <svg xmlns="http://www.w3.org/2000/svg" mlnsxlink="http://www.w3.org/1999/xlink" fill="white" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 30 471.701 471.701" xmlnsxlink="preserve">
                            <g>
                                <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z" />
                            </g>
                        </svg>
                    </span>
                </div>
            </div>
            <div className="px-4 pb-2 self-start text-xl">
                {parse(content)}
            </div>
        </div>

    )
}


/*  return (
      <div class="leading-normal tracking-normal text-indigo-400 m-6 bg-cover bg-fixed" style={{ backgroundImage: "url('https://raw.githubusercontent.com/tailwindtoolbox/Rainblur-Landing-Page/main/header.png')" }}>


          <div class="h-full">
              <div class="w-full container mx-auto">
                  <div class="w-full flex items-center justify-between">
                      <a class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
                          Rain<span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">blur</span>
                      </a>

                      <div class="flex w-1/2 justify-end content-center">
                          <a class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#">
                              <svg class="fill-current h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                  <path
                                      d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z"
                                  ></path>
                              </svg>
                          </a>
                          <a
                              class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                              href="https://www.facebook.com/sharer/sharer.php?u=#"
                          >
                              <svg class="fill-current h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                  <path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"></path>
                              </svg>
                          </a>
                      </div>
                  </div>
              </div>

              <div class="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                  <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                      <h1 class="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                          Main
                          <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                              Hero Message
                          </span>
                          to sell yourself!
                      </h1>
                      <p class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
                          Sub-hero message, not too long and not too short. Make it just right!
                      </p>

                      <form class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                          <div class="mb-4">
                              <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
                                  Signup for our newsletter
                              </label>
                              <input
                                  class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                  id="emailaddress"
                                  type="text"
                                  placeholder="you@somewhere.com"
                              />
                          </div>

                          <div class="flex items-center justify-between pt-4">
                              <button
                                  class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                  type="button"
                              >
                                  Sign Up
                              </button>
                          </div>
                      </form>
                  </div>

                  <div class="w-full xl:w-3/5 p-12 overflow-hidden">
                      <img class="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" src="https://raw.githubusercontent.com/tailwindtoolbox/Rainblur-Landing-Page/4599fd56c7e7ae187e578fcad5803ae03cc69231/macbook.svg" />
                  </div>

                  <div class="mx-auto md:pt-16">
                      <p class="text-blue-400 font-bold pb-8 lg:pb-6 text-center">
                          Download our app:
                      </p>
                      <div class="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
                          <img src="App Store.svg" class="h-12 pr-12 transform hover:scale-125 duration-300 ease-in-out" />
                          <img src="Play Store.svg" class="h-12 transform hover:scale-125 duration-300 ease-in-out" />
                      </div>
                  </div>

                  <div class="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
                      <a class="text-gray-500 no-underline hover:no-underline" href="#">&copy; App 2020</a>
                      - Template by
                      <a class="text-gray-500 no-underline hover:no-underline" href="https://www.tailwindtoolbox.com">TailwindToolbox.com</a>
                  </div>
              </div>
          </div>
      </div>
  )
} */