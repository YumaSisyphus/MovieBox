import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoutes = () => {
    const cookies = new Cookies();
    const check = cookies.get('token');
  let auth = { check };
  return auth.check ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
