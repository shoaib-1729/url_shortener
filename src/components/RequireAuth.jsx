import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  // import isAuthenticated,loading from store
  const { isAuthenticated, loading } = UrlState();
  // agar user authenticated nahi hai, aur loading false hai, tab user ho '/dashboard' route ki permission matt do, wapas '/auth' route par redirect karwado
  useEffect(() => {
    if (!isAuthenticated && loading == false) {
      navigate("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);
  //   agar loading true hai toh BarLoader dikha do
  if (loading) {
    <BarLoader width={"100%"} color="#36d7b7" />;
  }
  // agar authenticated hai, tab children yaani pages return kardo
  if (isAuthenticated) {
    return children;
  }
};
export default RequireAuth;
