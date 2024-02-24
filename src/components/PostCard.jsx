import appwriteService from "../appwrite/conf";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import img from "../assets/sincerely-media-vcF5y2Edm6A-unsplash (1).jpg";
import { useEffect, useRef } from "react";
import {
  easeOut,
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

function PostCard({ $id, title, $createdAt, featuredImage, content }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = $createdAt.split("T")[0].split("-")[1].split("")[1];
  let selectedMonthName = months[month - 1];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const mainControl = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const paraScroll = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
    }
  }, [isInView]);

  return (
    <section ref={containerRef}>
      <motion.div
        animate={mainControl}
        initial="hidden"
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        style={{ translateY: paraScroll }}
        transition={{ delay: 0.3, ease: easeOut }}
        className="h-64 border bg-white border-gray-200 text-gray-900 dark:text-gray-100 dark:border-gray-800 ease-in hover:drop-shadow-xl dark:bg-zinc-900"
      >
        <article className="flex object-cover text-clip h-full transition hover:shadow-xl">
          <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
            <time
              dateTime="2022-10-10"
              className="flex items-center justify-between gap-4 text-xs font-bold uppercase  "
            >
              <span>{$createdAt.split("-")[0]}</span>
              <span className="w-px flex-1 bg-gray-900/10 dark:bg-gray-100/10"></span>
              <span>
                {selectedMonthName} {$createdAt.split("T")[0].split("-")[2]}
              </span>
            </time>
          </div>

          <div className="hidden h-55 sm:block sm:basis-64">
            <img
              alt=""
              src={
                featuredImage == null
                  ? { img }
                  : appwriteService.getFilePreview(featuredImage)
              }
              className="aspect-square h-full w-full  object-cover"
            />
          </div>

          <div className="flex flex-1 overflow-hidden flex-col justify-between">
            <div className="border-s  border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
              <h3 className="font-bold line-clamp-3 uppercase ">{title}</h3>

              <div className="mt-2 text-sm/relaxed line-clamp-3 text-gray-400">
                {parse(content)}
              </div>
            </div>

            <div className="sm:flex  sm:items-end sm:justify-end">
              <Link
                to={`/post/${$id}`}
                className="block absolute bottom-0 right-0 bg-blue-600 px-5 py-3 text-center text-xs font-bold uppercase transition hover:bg-blue-800"
              >
                Read Blog
              </Link>
            </div>
          </div>
        </article>
      </motion.div>
    </section>
  );
}

export default PostCard;
