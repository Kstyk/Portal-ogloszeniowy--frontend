import jwtDecode from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "https://oferiaapi.azurewebsites.net";

const useAxios = () => {
  const { authToken, setUser, setAuthToken } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  //   axiosInstance.interceptors.request.use(async (req) => {
  //     const user = jwtDecode(authToken);
  //     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  //     if (!isExpired) return req;

  //     const response = await axios.post(`${baseURL}/api/auth/token/refresh/`, {
  //       refresh: authToken.refresh,
  //     });

  //     localStorage.setItem("authTokens", JSON.stringify(response.data));

  //     setAuthToken(response.data);
  //     setUser(jwtDecode(response.data.access));

  //     req.headers.Authorization = `Bearer ${response.data.access}`;
  //     return req;
  //   });

  return axiosInstance;
  // };
};
export default useAxios;
