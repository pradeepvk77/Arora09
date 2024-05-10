import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeBlogCard } from "../component";
import FloatinButton from "../component/FloatingButton";

export default function PostedBlog(){
    const navigate = useNavigate();
    const pageIsValid = useSelector((state)=>(state.status));
    const allPost = useSelector((state)=>(state.allPostData))
    const userData = useSelector((state)=>(state.userData));
    const postedpost = allPost.filter((eachpost)=>(eachpost.authorId === userData.$id))
    
    useEffect(()=>{
        if(!pageIsValid) {navigate('/home')}
    },[])
    return (

        <div className="flex flex-col mb-4">
         {postedpost.map((eachpost,index)=>(
            <div key={index} className="w-4/5">
                <HomeBlogCard eachPost={eachpost}/>
            </div>
         ))}  
         <FloatinButton /> 
        </div>
    )
}