/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import parse from 'html-react-parser'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import databaseCollection from "../service/database";
import bucketCollection from "../service/bucket";
import editIcon from '../assets/svg/editSvg.svg'
import deleteIcon from '../assets/svg/deleteSvg.svg'

export default function () {
    const navigate = useNavigate();
    const eachPost = useSelector((state) => (state.getSinglePost))
    const status = useSelector((state) => (state.status));
    const userData = useSelector((state) => (state.userData))
    const [imageUrl, setImageUrl] = useState('https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg')
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
        navigate('/edit_form/' + eachPost.$id)
    }
    async function getImage() {
        const check = await bucketCollection.getImagePrev(eachPost.imageId) + `&timestamp=${Date.now()}`;
        setImageUrl(check)
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
                <img src={imageUrl} alt="" />
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