import React, { useEffect, useState } from "react";
import { Container, Gridcards, Loader } from "../components";
import appWriteService from "../appwrite/conf";
import { Link } from "react-router-dom";
import { useRef } from "react";
import {
  easeOut,
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

function Allpost() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    appWriteService.getPosts().then((posts) => {
      if (posts) {
        setPost(posts.documents);
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

  return posts.length === 0 ? (
    <Loader />
  ) : (
    <div ref={containerRef} className="w-full p-3">
      <Container>
        <section className="bg-transparent ">
          <div className="container px-6 mx-auto">
            {/* <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">
              From the blog
            </h1> */}
            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
              {posts.map((post) => (
                <motion.div
                  style={{ translateY: paraScroll }}
                  initial={{ opacity: 0, y: 100, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
                  key={post.$id}
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

export default Allpost;
