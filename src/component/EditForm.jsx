/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import  { useEffect, useState } from "react";
import PostForm from "../pages/PostForm";
import { useParams } from "react-router-dom";
import databaseCollection from "../service/database";

function EditForm() {
    const { post_id } = useParams('post_id');
    if (post_id == 'post_blog') return (
        <PostForm />
    )
    const [post, setPost] =  useState(null)
    async function getPost() {
        const eachPost = await databaseCollection.getDataById(post_id)
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