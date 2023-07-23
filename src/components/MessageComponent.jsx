import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MessageComponent = (props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [logout, setLogout] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Sprawdź, czy URL zawiera parametr "?success"
    setIsSuccess(location.search.includes("?success"));
    setLogout(location.search.includes("?logout"));
  }, [location]);

  return (
    <div
      style={{ display: isSuccess || logout ? "inline-flex" : "none" }}
      className="alert alert-success mb-3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {logout ? (
        <span className="text-center w-full">{props.logoutMessage}</span>
      ) : (
        <span className="text-center w-full">{props.message}</span>
      )}
    </div>
  );
};

export default MessageComponent;
