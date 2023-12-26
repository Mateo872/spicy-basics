import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UsersState } from "../types/types.users";

const RouteProtect = ({ children }: { children: React.ReactNode }) => {
  const userState = useSelector((state: UsersState) => state.users.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  return children;
};

export default RouteProtect;
