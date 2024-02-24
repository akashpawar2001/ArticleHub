import React, { useEffect, useState } from "react";
import { Container, Loader, PostCard } from "../components";
import appWriteService from "../appwrite/conf";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { Query } from "appwrite";
import img from "../assets/sincerely-media-vcF5y2Edm6A-unsplash (1).jpg";
import { easeOut, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [post, setPosts] = useState([]);
  const [random, setRandom] = useState(0);
  const navigate = useNavigate();
  const isVisited = useSelector((state) => state.auth.status);
  console.log(isVisited);
  useEffect(() => {
    const query = [Query.equal("status", "active"), Query.limit(10)];
    appWriteService.getPosts(query).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      const num = Math.floor(Math.random() * posts.documents.length);
      setRandom(num);
    });
  }, []);

  if (post.length === 0) {
    return (
      <div className={`w-full dark:bg-zinc-950`}>
        <Container>
          <motion.section
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
            className={`py-10 sm:py-16 lg:py-24  ${
              isVisited === true ? "hidden" : "block"
            }`}
          >
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                  <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                    Here You Will Get
                  </p>
                  <h1 className="mt-4 text-4xl font-bold text-black dark:text-gray-100 lg:mt-8 sm:text-6xl xl:text-8xl">
                    Daily Blogs
                  </h1>
                  <p className="mt-4 text-base text-black dark:text-gray-200 lg:mt-8 sm:text-xl">
                    With Different Categories You can also add your own blogs.
                  </p>

                  <Link
                    to="/signup"
                    title=""
                    className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                    role="button"
                  >
                    Join for free
                    <svg
                      className="w-6 h-6 ml-8 -mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Link>
                </div>

                <div>
                  <img
                    className="w-full"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/hero-img.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </motion.section>
        </Container>
        <Loader className={`${isVisited === false ? "hidden" : "block"}`} />
      </div>
    );
  }
  return (
    <div className="w-full mt-6 px-8">
      <motion.section
        initial={{ opacity: 0, y: 100, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
      >
        <div className="mx-auto max-w-screen-xl dark:text-white px-4 py-5 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <motion.img
                initial={{ opacity: 0, y: 50, scale: 2 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
                alt=""
                src={
                  post.featuredImage === null
                    ? { img }
                    : appWriteService.getFilePreview(post[random].featuredImage)
                }
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="lg:py-24">
              <motion.h2
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
                className="text-3xl font-bold sm:text-4xl"
              >
                {post[random].title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: easeOut, delay: 0.4 }}
                className="mt-4 text-gray-600 line-clamp-5"
              >
                {parse(post[random].content)}
              </motion.div>
              <span>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: easeOut, delay: 0.2 }}
                  onClick={() => navigate(`/post/${post[random].$id}`)}
                  className="mt-8 inline-block rounded bg-cyan-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-cyan-500 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Read More..
                </motion.button>
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      <div>
        <span className=" text-2xl dark:text-white text-center px-6">
          Today's Blogs
        </span>
      </div>
      <Container>
        <div className="pt-5 grid py-5 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          {post.map((post) => (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
              key={post.$id}
              className=""
            >
              <PostCard {...post} />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
