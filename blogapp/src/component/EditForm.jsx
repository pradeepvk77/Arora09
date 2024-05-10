import React, { useEffect, useState } from "react";
import PostForm from "../pages/PostForm";
import { useParams, useSearchParams } from "react-router-dom";
import databaseCollection from "../service/database";

function EditForm() {
    const { postid } = useParams('postid');
    if (postid == 'postblog') return (
        <PostForm />
    )
    const [post, setPost] =  useState(null)
    async function getPost() {
        const eachPost = await databaseCollection.getDataById(postid)
        // console.log(eachPost)
        setPost(eachPost)
    }
    useEffect(() => {
        getPost()
    }, [])
    return (
        <div>
            {!post && <div className="w-full justify-center items-center flex flex-col">
                <div className="spinner"></div>
            </div>}
            {post && <PostForm post={post} />}
        </div>
    )
}

export default EditForm