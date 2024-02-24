import appwriteService from "../appwrite/conf";
import { Link } from "react-router-dom";
import img from "../assets/sincerely-media-vcF5y2Edm6A-unsplash (1).jpg";

function Gridcards({ $id, title, $createdAt, featuredImage }) {
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
  return (
    <>
      <img
        className="object-cover w-full h-56 rounded-lg lg:w-64"
        src={
          featuredImage == null
            ? { img }
            : appwriteService.getFilePreview(featuredImage)
        }
        alt=""
      />

      <div className="flex flex-col justify-between py-6 lg:mx-6 text-gray-800 dark:text-white">
        <Link
          to={`/post/${$id}`}
          className="text-xl font-semibold  hover:underline"
        >
          {title}
        </Link>

        <span className="text-sm">
          Posted On : {$createdAt.split("T")[0].split("-")[2]}{" "}
          {selectedMonthName} {$createdAt.split("-")[0]}
        </span>
      </div>
    </>
  );
}

export default Gridcards;
