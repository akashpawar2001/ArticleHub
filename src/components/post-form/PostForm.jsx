import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Input,
  Select,
  RTE,
  LoadingBtn,
  Toast,
  SelectCategory,
} from "..";
import appwriteService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        status: post?.status || "active",
        auther: post?.auther || "",
        content: post?.content || "",
        category: post?.category || "news",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userdata);

  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    Toast("Please Wait Until Request Success.", "info");
    setLoading(true);
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        setTimeout(function () {
          Toast("Post Updated Successfully", "success");
        }, 2000);
        setTimeout(function () {
          navigate(`/post/${dbPost.$id}`);
        }, 4000);
      } else {
        Toast("Something Went Wrong", "error");
      }
    } else if (data) {
      const file = await appwriteService.uploadFile(data.image[0]);

      const fileId = file.$id;
      data.featuredImage = fileId;
      const dbPost = await appwriteService.createPost({
        ...data,
        userId: userData.$id,
      });
      if (dbPost) {
        setTimeout(function () {
          Toast("Post Added Successfully", "success");
        }, 2000);
        setTimeout(function () {
          navigate(`/post/${dbPost.$id}`);
        }, 4000);
      } else {
        Toast("Something Went Wrong", "error");
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "auther") {
        setValue("slug", slugTransform(value.auther), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="sm:px-20 px-6 py-10">
      <div className="flex flex-wrap gap-10">
        <div className="w-full lg:w-2/4 px-2 ">
          <Input
            label="Auther : "
            message="Only accept 36 char"
            placeholder={post?.auther || "auther"}
            className="p-3 "
            {...register("auther", {
              required: true,
              maxLength: 36,
            })}
          />
          {/* <p className="text-red-500">{errors.auther.message}</p> */}
          <br />
          <Input
            label="Slug :"
            message="(autocomplete * do not write anything)"
            placeholder={post?.$id || "slug"}
            className="p-3"
            readOnly={true}
            {...register("slug", {
              required: true,
              maxLength: 36,
            })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <br />
          <Input
            label="Title : "
            message="Required Field"
            placeholder={post?.title || "title"}
            className="p-3"
            {...register("title", {
              required: true,
            })}
          />
          <br />
          <SelectCategory
            label="Select Category : "
            className="p-2"
            {...register("category")}
          />
        </div>
        <div className="w-full lg:w-2/5 px-2 ">
          <Input
            label="images"
            type="file"
            message="1mb-size img file only"
            accept="image/png,image/jpg,image/jpeg,image/gif"
            className="border border-gray-200 rounded p-2"
            {...register("image")}
          />

          {post && (
            <div className="w-full">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <br />

          <Select
            label="status : "
            value="active"
            id="activ"
            {...register("status", { required: true })}
          />
          <Select
            value="inactive"
            id="inactiv"
            {...register("status", { required: true })}
          />
          <br />

          <Button
            bgColor={post ? "bg-green-500" : "bg-indigo-700"}
            className="mt-7"
            type="submit"
          >
            {loading ? <LoadingBtn /> : post ? "Update Post" : "Add Post"}
          </Button>
          <ToastContainer />
        </div>
      </div>
      <div className="mt-5">
        <RTE
          label="Content : "
          message={"Required Content"}
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
    </form>
  );
}
