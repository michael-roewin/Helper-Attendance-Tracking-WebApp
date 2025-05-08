import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../app-context";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserService } from "../services/user.service";

interface JwtPayload {
  userId: string
}

export default function AuthWrapper() {
  const context = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (context?.appState?.userLoaded) {
      return;
    }

    const userJson = localStorage.getItem('user');
    const token = localStorage.getItem('token') || '';

    if (!userJson || !token) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userJson);

    context?.setAppState({
      user,
    });

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    const decoded: JwtPayload = jwtDecode(token);

    const userId = Number(decoded.userId);

    const fetchUser = async () => {
      try {
        const user = (await UserService.getUser(userId))?.data;

        context?.setAppState({
          user,
          userLoaded: true,
        });

      } catch (e) {
        localStorage.clear();

        navigate("/login");
      }
    }

    fetchUser();
  }, []);

  return (
    context?.appState?.user
      ?
        <Outlet />
      :
        <Navigate to='/login' />
  )
}