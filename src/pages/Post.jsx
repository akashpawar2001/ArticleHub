import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Container, PostCard, Loader, Toast } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import appWriteService from "../appwrite/conf";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Query } from "appwrite";
import img from "../assets/sincerely-media-vcF5y2Edm6A-unsplash (1).jpg";
import { motion } from "framer-motion";

export default function Post() {
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userdata);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const query = [Query.equal("status", "active"), Query.limit(15)];
    appWriteService.getPosts(query).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        Toast("Post Deleted Successfully", "success");
        appwriteService.deleteFile(post.featuredImage);
        setTimeout(function () {
          navigate("/");
        }, 2000);
      }
    });
  };

  return post ? (
    <>
      <Container>
        <div className="max-w-screen-lg py-5 px-2 sm:px-10 mx-auto">
          <div className="mb-4 md:mb-0 w-full mx-auto relative">
            <div className="mb-4 lg:px-0">
              <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                {post.title}
              </h2>
              <span
                href=""
                className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
              >
                {post.category}
              </span>
            </div>
            {isAuthor && (
              <div className="flex gap-5 flex-wrap mb-5">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ bounceDamping: 10, bounceStiffness: 60 }}
                  onClick={() => navigate(`/edit-post/${post.$id}`)}
                  className="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ bounceDamping: 10, bounceStiffness: 60 }}
                  onClick={deletePost}
                  className="mt-8 inline-block rounded border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500"
                >
                  Delete
                </motion.button>
              </div>
            )}
            <img
              src={
                post.featuredImage == null
                  ? { img }
                  : appwriteService.getFilePreview(post.featuredImage)
              }
              className="w-full object-cover lg:rounded"
              style={{ height: " 28em" }}
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="px-4 lg:px-0 mt-12 text-gray-700 dark:text-gray-200 text-lg leading-relaxed w-full">
              {parse(post.content)}
            </div>
          </div>
          <ToastContainer />
        </div>
      </Container>
      <hr className="mt-12" />
      <div className="w-full mt-6 p-3 pb-5 dark:text-white">
        <h1 className="text-center text-3xl mb-10 font-extrabold">
          More Blogs
        </h1>
        <Container>
          <div className="grid  grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            {posts.map((post) => (
              <div key={post.$id} className="">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  ) : (
    <Loader />
  );
}
