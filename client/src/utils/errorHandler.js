import { logout } from "redux/actions/userActions";
import store from "redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "./toast";
import { useQueryClient } from "react-query";
import API from "api/api";

const useErrorHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const errorHandler = async (error, reqType) => {
    //status 401: access_token has expired,
    if (error.toJSON().status === 401) {
      try {
        //refresh access_token using refresh_token and remake the api call
        const api = new API();
        const { data } = await api.getAccessToken();

        localStorage.setItem("userInfo", JSON.stringify(data));

        //For post/put/delete request, ask the user to retry once the access_token is refreshed
        if (reqType) {
          toast({
            title: "Unsuccessful, Please Retry",
            status: "error",
          });
        } else {
          queryClient.invalidateQueries();
        }
      } catch (_error) {
        //refresh_token also expired, logout the user
        store.dispatch(logout());
        toast({
          title: "Session Expired, Login Again",
          status: "error",
        });
      }
    } else {
      //trigger app re-render and show appropriate screen based on status code
      navigate(location.pathname, {
        replace: true,
        state: {
          errorStatusCode: error.toJSON().status,
          redirect: error.response?.data?.redirect,
        },
      });
      toast({
        title: error?.response?.data?.message || error.message,
        status: "error",
      });
    }
  };

  return errorHandler;
};

export default useErrorHandler;
