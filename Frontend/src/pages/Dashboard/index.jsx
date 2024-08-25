import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedInUser } from "../../hooks/auth.hooks";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useLoggedInUser();

  useEffect(() => {
    console.log(user, isLoading);
    if (!user && !isLoading) {
      navigate("/sign-in");
    }
  }, [user, navigate, isLoading]);

  return <h1>DashBoard</h1>;
};
export default DashboardPage;
