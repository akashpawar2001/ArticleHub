import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Input, Button, Tooltips } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { easeOut, motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState("");

  const login = async (data) => {
    setErrors("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userdata = await authService.getCurrentUser();
        if (userdata) dispatch(authLogin(userdata));
        navigate("/");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
      className=" mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-lg rounded bg-white dark:bg-zinc-900 flex flex-col justify-center items-center">
        <h1 className="text-center mt-2 py-2 text-2xl font-bold text-indigo-600 sm:text-3xl">
          Get started today
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>
        {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}
        <form
          onSubmit={handleSubmit(login)}
          className="mb-0 mt-4 flex flex-col items-center bg-transparent justify-center space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 w-full"
        >
          <span className="relative flex justify-center w-full">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

            <span className="relative z-10 bg-white dark:bg-zinc-900 dark:text-gray-100 px-6">
              {" "}
              Sign in to your account
            </span>
          </span>
          <Input
            label="Email"
            message="Enter Valid Email"
            placeholder="Enter Your email"
            type="email"
            className="p-3 dark:bg-slate-800 dark:text-gray-200 dark:border-zinc-900"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            message="Enter Valid Password"
            placeholder="Enter Your password"
            type="password"
            className="p-3 dark:bg-slate-800 dark:text-gray-200 dark:border-zinc-900"
            {...register("password", {
              required: true,
            })}
          />

          <Button type="submit" className="w-full inline-block">
            Sign in
          </Button>
          <div
            data-tooltip-target="tooltip-light"
            data-tooltip-style="light"
            className="text-center text-sm text-gray-500 items-center justify-center gap-2 flex"
          >
            No account?
            <span>
              <Link to={"/signup"}>
                <span className="underline">Sign up</span>
              </Link>
            </span>
            <Tooltips
              message={
                "Use email: admin@gmail.com password: admin@123 for testing purpose."
              }
            />
          </div>
        </form>
      </div>
    </motion.div>
  );
}
export default Login;
