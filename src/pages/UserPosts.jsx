import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Gridcards, Loader, Toast } from "../components";
import { useSelector } from "react-redux";
import appWriteService from "../appwrite/conf";
import { Query } from "appwrite";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import {
  easeOut,
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

export default function UserPosts() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userdata);
  useEffect(() => {
    const qurey = [Query.equal("userId", `${userData.$id}`)];
    appWriteService.getUserPosts(qurey).then((posts) => {
      setPost(posts.documents);
      if (posts.documents === null) {
        setTimeout(function () {
          Toast("First Add Post", "info");
        }, 2000);
        setTimeout(function () {
          navigate("/add-post");
        }, 5000);
      }
    });
  }, []);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const mainControl = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const paraScroll = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
    }
  }, [isInView]);

  return post === null ? (
    <>
      <Loader />
      <ToastContainer />
    </>
  ) : (
    <div className="w-full p-3">
      <Container>
        <section className="bg-transparent">
          <div className="container px-6 mx-auto">
            {/* <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">
              From the blog
            </h1> */}
            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
              {post.map((post) => (
                <motion.div
                  style={{ translateY: paraScroll }}
                  initial={{ opacity: 0, y: 100, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
                  key={post.auther}
                  className="lg:flex"
                >
                  <Gridcards {...post} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
