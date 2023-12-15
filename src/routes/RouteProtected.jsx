import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RouteProtect = ({ children }) => {
  const userState = useSelector((state) => state.users.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  return children;
};

export default RouteProtect;
