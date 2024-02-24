import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };
  return (
    <button
      className="group relative inline-block text-sm font-bold text-white focus:outline-none focus:ring"
      onClick={logoutHandler}
    >
      <span className="absolute inset-0 border border-blue-600 group-active:border-blue-500"></span>
      <span className="block border border-blue-600 bg-blue-600 px-12 py-3 transition-transform active:border-blue-500 active:bg-blue-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
        Logout
      </span>
    </button>
  );
}

export default LogoutBtn;
