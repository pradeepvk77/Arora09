import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putAllPost } from "../reduxstore/reducer/authSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HomeBlogCard } from "../component";
import authService from "../service/auth";
import databaseCollection from "../service/database";
import Button from "../component/Button";
import FloatinButton from "../component/FloatingButton";

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const flag = useSelector((state) => (state.status))
    const data = useSelector((state) => (state.userData))
    const allPost = useSelector((state) => (state.allPostData))
    const [emptyDiv, setEmptyDiv] = useState(true)
    async function getPost() {
        const allPost = await databaseCollection.getData();
        dispatch(putAllPost(allPost));
        if (allPost.length === 0) setEmptyDiv(null)
    }
    
    
    const postedBlog = ()=>{
        navigate('/postedblog')
    }


    useEffect(() => {
        //console.log(data)
        if (!flag) navigate('/')
        getPost();

    }, [flag], data, allPost)


    return (flag ? (
        <>
            {!emptyDiv &&
                <div className="h-56 justify-center items-center flex flex-col">
                    <div className="text-xl text-white">No content Here!!! Sorry.... become first to post here :{`)`}</div>
                    <div className="mt-8 border border-opacity-50 border-white bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    ><NavLink to={'/editform/postblog'}>Post Blog</NavLink></div>

                </div>}

            <div className="flex flex-col justify-between relative">
                <div className="flex flex-col ">
                    {allPost.map((eachPost, index) => (
                        <div key={index} className="w-4/5">
                            <HomeBlogCard eachPost={eachPost} />
                        </div>
                    ))}
                </div>
                <FloatinButton />
                
            </div>


        </>
    ) : null)
}

export default Home