import React, { useId } from "react";
import { Tooltips } from ".";
const Input = React.forwardRef(function Input(
  { label, readOnly, type = "text", className = "", message, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="flex text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          <Tooltips message={message} />
        </label>
      )}

      <input
        type={type}
        id={id}
        {...props}
        ref={ref}
        readOnly={readOnly}
        className={`${className} mt-1 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:bg-slate-800 dark:text-gray-200 dark:border-zinc-900`}
      />
    </div>
  );
});
export default Input;
