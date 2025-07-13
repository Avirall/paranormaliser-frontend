"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "@/components/styles/logout.module.scss";
import { logout } from "@/api";

const LogoutButton = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const router = useRouter();

  const logoutSession = () => {
    logout()
      .then(() => {
        window.localStorage.removeItem("is_authenticated");
        window.localStorage.removeItem("fullname");
        window.localStorage.removeItem("username");
        window.location.reload();
        setIsAuthenticated(false);
        router.push("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        alert("Logout failed. Please try again.");
      });
  };

  useEffect(() => {
    if (window.localStorage.getItem("is_authenticated") === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [window.localStorage.getItem("is_authenticated")]);

  return (
    isAuthenticated && (
      <div onClick={logoutSession} className={style.logout}>
        Logout
      </div>
    )
  );
};

export default LogoutButton;
