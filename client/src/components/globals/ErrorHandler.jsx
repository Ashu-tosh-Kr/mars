import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import PageNotFound from "screens/errorPages/PageNotFound";
import InternalServerError from "screens/errorPages/InternalServerError";

const ErrorHandler = ({ statusCode }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.clear();
    queryClient.invalidateQueries();
    navigate("/login", { replace: true });
  };

  switch (statusCode) {
    case 404:
      return <PageNotFound />;
    case 400:
      return <PageNotFound />;
    case 500:
      return <InternalServerError />;
    case 401:
      handleLogout();
  }
};

export default ErrorHandler;
