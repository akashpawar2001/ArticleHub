import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index";
import { easeOut, motion } from "framer-motion";
const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
      className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-lg rounded bg-white dark:bg-zinc-900 flex flex-col justify-center items-center">
        <h1 className="text-center mt-2 py-2 text-2xl font-bold text-indigo-600 sm:text-3xl">
          Get started today
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        <form
          onSubmit={handleSubmit(create)}
          className="mb-0 mt-6 flex flex-col items-center justify-center w-full space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <span class="relative flex justify-center w-full">
            <div class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

            <span class="relative z-10 bg-white dark:bg-zinc-900 dark:text-gray-100 px-6">
              {" "}
              Sign Up to your account
            </span>
          </span>
          <Input
            label="Full Name "
            message="Enter Full Name"
            placeholder="Enter Your Name"
            className="p-3 dark:bg-slate-800 dark:text-gray-200 dark:border-zinc-900"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            label="Email"
            message="example@gmail.com required:@"
            placeholder="Enter Your email"
            type="email"
            className="p-3 dark:bg-slate-800 dark:text-gray-200 dark:border-zinc-900"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                    value
                  ) || "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            message="Password size 8 char."
            placeholder="Enter Your password"
            type="password"
            className="p-3 dark:bg-slate-800 dark:text-gray-200 dark:border-zinc-900"
            {...register("password", {
              required: true,
            })}
          />

          <Button type="submit">Sign Up</Button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?
            <Link to={"/login"}>
              <span className="underline">Sign In</span>
            </Link>
          </p>
        </form>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      </div>
    </motion.div>
  );
};

export default Signup;
