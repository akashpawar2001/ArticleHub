import { ToastContainer, toast } from "react-toastify";
function Toast(message, type) {
  const options = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "warning":
      toast.warn(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
  }
}

export default Toast;
