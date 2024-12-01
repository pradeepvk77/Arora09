/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ID } from "appwrite";
import RTE from "../component/RTE";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pushInPost } from "../reduxStore/reducer/authSlice";
import databaseCollection from "../service/database";
import bucketCollection from "../service/bucket";
import sendSvg from "../assets/svg/sendSvg.svg";

//TODO.. featured image set post get post detail

function PostForm({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = post?.$id || ID.unique();
  const pageIsValid = useSelector((state) => state.status);
  const userData = useSelector((state) => state.userData);
  const [error, setError] = useState(null);
  const [titleSet, setTitleSet] = useState(post?.title || "");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      EditorControl: post?.EditorControl || "Write here....",
    },
  });

  const submitPost = async (data) => {
    // at first editor give undefine if valued not typed yet
    setError(null);
    setSubmitting(true);
    const dataTitle = data.title.charAt(0).toUpperCase() + data.title.slice(1);
    data = {
      ...data,
      title: dataTitle,
      author: userData.name,
      authorId: userData.$id,
      slug: data.slug,
    };
    if (!image) {
      setSubmitting(false);
      setError("!!! Please select an image");
      return;
    }
    if (post) {
      const imageId = await bucketCollection.updateImage(post.imageId, image);
      await databaseCollection.updatePostData(
        { ...data, imageId: imageId },
        id
      );
    } else {
      const imageId = await bucketCollection.putPostImage(image, id);
      await databaseCollection.pushData({ ...data, imageId: imageId }, id);
      dispatch(pushInPost({ ...data, imageId: imageId }));
    }
    setSubmitting(false);
    navigate("/home");
  };

  const slugTransform = (value = "") =>
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
  useEffect(() => {
    if (!pageIsValid) navigate("/home"); // if user Hit refresh button we lost user data from store
    setValue("slug", slugTransform(titleSet));
  }, [titleSet]);
  return (
    <div className="h-full">
      <div className="bg-gray-300 bg-opacity-30 w-3/4 mx-auto rounded-lg p-2 mt-2">
        <form
          onSubmit={handleSubmit(submitPost)}
          className="flex flex-col justify-center item-center pb-4 m-2"
        >
          <div className="flex flex-col flex-wrap">
            <div className="w-full flex justify-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black via-blue-900 to-purple-900">
              Bind your thought in word
            </div>
            <div className="flex flex-wrap flex-col">
              <label className="text-2xl font-semibold py-2">Title</label>
              <input
                type="text"
                placeholder="title of your blog"
                value={titleSet}
                {...register("title")}
                onChange={(e) => {
                  setTitleSet(e.target.value);
                }}
                className="h-10 text-xl pl-2 rounded-lg shadow-md"
              />
              <label className="text-xl font-semibold py-2">Slug(id)</label>
              <input
                type="text"
                placeholder="blog-id"
                disabled="true"
                {...register("slug")}
                className=" h-10 text-xl pl-2 rounded-lg shadow-md"
              />
              <div className="h-80 bg-white mt-2 rounded-lg">
                <label className="text-xl font-semibold py-2">Editor</label>
                <RTE control={control} content={post?.EditorControl} />
              </div>
            </div>
            <div className="flex flex-col  justify-center items-center p-2 py-4">
              <span className="flex justify-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black via-blue-900 to-purple-900 p-2">
                A image tell more than word.
              </span>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Image"
                  className="w-2/4 rounded-lg shadow-lg m-2"
                />
              )}
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <div className="loading flex flex-row justify-center items-center">
            <button className="bg-blue-600 w-22 self-center flex rounded-lg px-2 py-1 pl-4 mr-4 text-xl font-semibold ">
              Post
              <img src={sendSvg} alt="send" className="h-6 self-center mx-2" />
            </button>
            {error && <p className="m-2 text-red-600">{error}</p>}
            {submitting && <span className="spinner"></span>}
          </div>
        </form>
      </div>
    </div>
  );
}
export default PostForm;
