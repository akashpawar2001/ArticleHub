import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassCircleIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { lightTheme, darkTheme } from "../../store/theme";
import { useNavigate } from "react-router-dom";
import { easeOut, motion } from "framer-motion";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  //Logout Function handle
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  {
    /*This section is used for to switch between dark and light mode */
  }
  let mode = useSelector((state) => state.theme.themeMode);
  useEffect(() => {
    let html = document.querySelector("html");
    html.classList.remove("light", "dark");
    html.classList.add(mode);
  }, [mode]);
  function changeModeTolight() {
    document.querySelector("#dark").classList.remove("hidden");
    document.querySelector("#light").classList.add("hidden");
    dispatch(lightTheme("light"));
  }
  function changeModeToDark() {
    document.querySelector("#light").classList.remove("hidden");
    document.querySelector("#dark").classList.add("hidden");
    dispatch(darkTheme("dark"));
  }

  const authStatus = useSelector((state) => state.auth.status);
  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "All Posts", href: "/all-posts", current: authStatus },
    { name: "Add Posts", href: "/add-post", current: authStatus },
    { name: "Login", href: "/login", current: !authStatus },
    { name: "Signup", href: "/signup", current: !authStatus },
  ];

  const icon = {
    hide: {
      pathLength: 0,
      fill: "rgba(0, 0, 0, 0)",
    },
    visible: {
      pathLength: 1,
      fill: "rgba(0, 0, 255, 1)",
    },
  };

  return (
    <Disclosure
      as="nav"
      className="sticky z-30 top-0 backdrop-blur-lg shadow-lg dark:text-white"
    >
      {({ open }) => (
        <>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut }}
            className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
          >
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-full dark:text-gray-200 text-gray-800 hover:bg-gray-400  hover:text-white focus:outline-none ">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center ml-10 sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center text-blue-800">
                  <Link to={"/"}>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      className="w-6 overflow-visible"
                      strokeWidth={"2"}
                      strokeLinejoin={"rounded"}
                      strokeLinecap={"rounded"}
                    >
                      <motion.path
                        d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                        variants={icon}
                        initial="hide"
                        animate="visible"
                        transition={{
                          default: { duration: 3, ease: "easeInOut" },
                          fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                        }}
                      />
                    </motion.svg>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="">
                    <ul className="flex space-x-4">
                      {navigation.map((item) =>
                        item.current ? (
                          <li key={item.name}>
                            <NavLink
                              to={item.href}
                              className={({ isActive }) =>
                                `${
                                  isActive
                                    ? "bg-blue-900 text-white"
                                    : `text-gray-800 dark:text-white
                                  hover:bg-blue-700
                                  hover:text-white`
                                }
                        rounded-md px-3 py-2 text-sm font-medium`
                              }
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex gap-3 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  onClick={() => navigate("/search")}
                  className="relative rounded-full p-1 bg-gray-800 text-gray-400 dark:bg-gray-400 dark:text-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <MagnifyingGlassCircleIcon
                    className="h-6 w-6 text-center"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  onClick={changeModeToDark}
                  id="dark"
                  className="relative rounded-full p-1 bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <MoonIcon
                    className="h-6 w-6 text-center"
                    aria-hidden="true"
                  />
                </button>

                <button
                  type="button"
                  onClick={changeModeTolight}
                  id="light"
                  className="relative hidden rounded-full p-1 bg-gray-800 text-gray-400 dark:bg-gray-400 dark:text-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>

                  <SunIcon className="h-6 w-6 text-center" aria-hidden="true" />
                </button>
                {/* Profile dropdown */}
                {authStatus ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYiTtJWJAtOh0EpPhOQkkmIIGDGPyanfJn3qWSJCI5PA&s"
                          alt=""
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {/* <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"/profile"}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item> */}
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"/your-posts"}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Posts
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              onClick={logoutHandler}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Logout
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : null}
              </div>
            </div>
          </motion.div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <ul className="space-y-1 text-center">
                {navigation.map((item) =>
                  item.current ? (
                    <li key={item.name} className="">
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "bg-blue-900 text-white"
                              : `text-gray-800 dark:text-white
                          hover:bg-blue-700
                          hover:text-white`
                          }
                        rounded-md px-3 py-2 text-sm font-medium`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
