/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeBlogCard } from "../component";
import FloatingButton from "../component/FloatingButton";

export default function PostedBlog(){
    const navigate = useNavigate();
    const pageIsValid = useSelector((state)=>(state.status));
    const allPost = useSelector((state)=>(state.allPostData))
    const userData = useSelector((state)=>(state.userData));
    const postedPost = allPost.filter((eachPost)=>(eachPost.authorId === userData.$id))
    
    useEffect(()=>{
        if(!pageIsValid) {navigate('/home')}
    },[])
    return (

        <div className="flex flex-col mb-4">
         {postedPost.map((eachPost,index)=>(
            <div key={index} className="w-4/5">
                <HomeBlogCard eachPost={eachPost}/>
            </div>
         ))}  
         <FloatingButton /> 
        </div>
    )
}