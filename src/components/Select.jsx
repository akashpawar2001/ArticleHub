import React, { useEffect, useId, useState } from "react";
function Select({ value, id = "", label, className = "", ...props }, ref) {
  return (
    <div className="w-full mt-[5px]">
      <label className="block mb-[5px] text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <fieldset className="grid grid-cols-2 gap-4">
        <div>
          <label
            id={id}
            className="block cursor-pointer rounded-lg border border-gray-200 dark:bg-slate-800  dark:border-zinc-900 bg-white p-2 text-sm font-medium shadow-sm  hover:border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
          >
            <div>
              <p className="text-gray-700 dark:text-gray-300">{value}</p>
            </div>
            <input
              type="radio"
              id={id}
              {...props}
              value={value}
              ref={ref}
              className="sr-only"
            />
          </label>
        </div>
      </fieldset>
    </div>
  );
}

export default React.forwardRef(Select);
