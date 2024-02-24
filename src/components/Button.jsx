function Button({
  children,
  bgColor = "bg-indigo-600",
  className = "",
  ...props
}) {
  return (
    <div className="">
      <button
        className={`${className} ${bgColor} inline-block rounded  px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
