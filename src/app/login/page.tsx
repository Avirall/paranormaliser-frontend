"use client";
import { useEffect, useState } from "react";
import style from "./styles.module.scss";
import { loginMessages } from "@/contants";
import { useRouter } from "next/navigation";
import { login } from "@/api";

export default function Login() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const random =
      loginMessages[Math.floor(Math.random() * loginMessages.length)];
    setMessage(random);
  }, []);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    field_name: string
  ) => {
    if (field_name === "username") {
      setUsername(event?.target.value);
      setUsernameError("");
    } else if (field_name === "password") {
      setPassword(event?.target.value);
      setPasswordError("");
    }
  };

  const handleSubmit = () => {
    if (!username) {
      setUsernameError("Username is required.");
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
    } else {
      setPasswordError("");
    }

    if (username && password) {
      login(username, password)
        .then((res) => {
          if (res?.message === "Login successful") {
          }
        })
        .catch((err) => {
          console.log("Login failed:", err);
        });
    }
  };

  return (
    <div className={style.login_container}>
      <div className={style.message}>{message}</div>
      <div className={style.login_form}>
        <div className={style.form_group}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username ?? ""}
            onChange={(e) => {
              handleInput(e, "username");
            }}
          />
          <span className={style.error_message}>{usernameError}</span>
        </div>
        <div className={style.form_group}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => handleInput(e, "password")}
            value={password ?? ""}
          />
          <span className={style.error_message}>{passwordError}</span>
        </div>
      </div>
      <div className={style.inputfield}>
        <div className={style.button_container}>
          <button className={style.login_button} onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div className={style.button_container}>
          <button
            className={style.login_button}
            onClick={() => router.push("/signup")}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
