"use client";
import { JSX, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

const Authenticate = (props: any) => {
  const router = useRouter();
  useEffect(() => {
    const is_authenticated = window.localStorage.getItem("is_authenticated");
    if (is_authenticated !== "true") {
      router.push("/login");
    }
  }, []);
  return <div>{props.children}</div>;
};

export default Authenticate;
