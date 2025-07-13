"use client";
import { useEffect, useState } from "react";
import style from "./styles.module.scss";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { signup } from "@/api";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (window.localStorage.getItem("is_authenticated") === "true") {
      router.push("/chat");
    } else {
      setLoading(false);
    }
  }, []);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    switch (field) {
      case "name":
        setName(value);
        setErrors((prev) => ({ ...prev, name: "" }));
        break;
      case "username":
        setUsername(value);
        setErrors((prev) => ({ ...prev, username: "" }));
        break;
      case "password":
        setPassword(value);
        setErrors((prev) => ({ ...prev, password: "" }));
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        break;
    }
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    };

    if (!name) newErrors.name = "Name is required.";
    if (!username) newErrors.username = "Username is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirmation is required.";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (!hasErrors) {
      signup(name, username, password)
        .then(() => {
          window.localStorage.setItem("is_authenticated", "true");
          window.localStorage.setItem("username", username);
          window.localStorage.setItem("fullname", name);
          router.push("/chat");
        })
        .catch((error) => {
          if (error.message.includes("Username already exists")) {
            setErrors((prev) => ({
              ...prev,
              username: "Username already exists.",
            }));
          } else {
            console.error("Signup failed:", error);
          }
        });
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className={style.signup_container}>
      <div className={style.message}>Create your account</div>
      <div className={style.signup_form}>
        <div className={style.form_row}>
          <div className={style.inputfield}>
            <div className={`${style.form_group} ${style.half_width}`}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => handleInput(e, "name")}
              />
              <span className={style.error_message}>{errors.name}</span>
            </div>

            <div className={`${style.form_group} ${style.half_width}`}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => handleInput(e, "username")}
              />
              <span className={style.error_message}>{errors.username}</span>
            </div>
          </div>
        </div>

        <div className={style.form_row}>
          <div className={style.inputfield}>
            <div className={`${style.form_group} ${style.half_width}`}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => handleInput(e, "password")}
              />
              <span className={style.error_message}>{errors.password}</span>
            </div>

            <div className={`${style.form_group} ${style.half_width}`}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleInput(e, "confirmPassword")}
              />
              <span className={style.error_message}>
                {errors.confirmPassword}
              </span>
            </div>
          </div>
        </div>

        <div className={style.button_row}>
          <button className={style.signup_button} onClick={handleSubmit}>
            Create Account
          </button>
          <button
            className={style.signup_button}
            onClick={() => router.push("/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
