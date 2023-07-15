import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwtDecode(localStorage.getItem("authToken"))
      : null
  );
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let loginUser = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "https://oferiaapi.azurewebsites.net/api/account/login",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setAuthToken(res.data);
        setUser(jwtDecode(res.data));
        localStorage.setItem("authToken", JSON.stringify(res.data));

        if (jwtDecode(res.data).TypeOfAccount == "Wykonawca") {
          axios
            .get(
              `https://oferiaapi.azurewebsites.net/api/category/userCategories/${
                jwtDecode(res.data).Id
              }`
            )
            .then((res) => {
              if (res.data.length > 0) {
                nav("/");
              } else {
                nav("/contractor/add-categories");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("else");
          nav("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  };

  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    nav("/login");
  };

  let contextData = {
    user: user,
    authToken: authToken,
    setAuthToken: setAuthToken,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    error: error,
    setError: setError,
  };

  useEffect(() => {
    if (authToken) {
      setUser(jwtDecode(authToken));
    }
    setLoading(false);
  }, [authToken, loading]);

  // useEffect(() => {
  //   if (authToken != null) {
  //     redirecting();
  //   }
  // }, [authToken]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
