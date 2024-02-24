import React, { useEffect, useState } from "react";
import { Container, Gridcards, Loader, Toast } from "../components";
import appWriteService from "../appwrite/conf";
import { useParams, useNavigate } from "react-router-dom";
import { Query } from "appwrite";

function SearchResult() {
  const [posts, setPost] = useState([]);
  const param = useParams();
  const navigate = useNavigate();
  const query = [Query.equal("category", param.category)];
  useEffect(() => {
    appWriteService.getPosts(query).then((posts) => {
      if (posts.documents.length !== 0) {
        setPost(posts.documents);
      } else {
        setTimeout(function () {
          navigate("/notfound");
        }, 5000);
      }
    });
  }, []);

  return posts.length === 0 ? (
    <Loader />
  ) : (
    <div className="w-full p-3">
      <Container>
        <section className="bg-transparent ">
          <div className="container px-6 mx-auto">
            {/* <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">
              From the blog
            </h1> */}
            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
              {posts.map((post) => (
                <div key={post.$id} className="lg:flex">
                  <Gridcards {...post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default SearchResult;
