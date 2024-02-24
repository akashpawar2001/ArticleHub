import React, { useEffect, useState } from "react";
import { Container, PostForm, Loader } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import appWriteService from "../appwrite/conf";
function EditPost() {
  const [posts, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      appWriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);
  return posts === null ? (
    <Loader />
  ) : (
    <div className="">
      <Container>
        <PostForm post={posts} />
      </Container>
    </div>
  );
}

export default EditPost;
