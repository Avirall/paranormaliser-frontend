import React from "react";
import style from "@/components/styles/loader.module.scss";

const Loader = () => {
  return (
    <div className={style.loading_container}>
      <div className={style.loading_spinner}></div>
      <div className={style.loading_text}>Loading...</div>
    </div>
  );
};

export default Loader;
