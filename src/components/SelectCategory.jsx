import React from "react";
import category from "./category";

function SelectCategory({ label, className = "", ...props }, ref) {
  return (
    <div>
      <label
        htmlFor="cat"
        className="flex text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      <select
        id="cat"
        {...props}
        className={`${className} mt-1 rounded-lg border text-gray-700 text-sm cursor-pointer border-gray-200 shadow-sm sm:text-sm dark:bg-slate-800 dark:text-gray-200 dark:border-zinc-900`}
        ref={ref}
      >
        {category.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default React.forwardRef(SelectCategory);
