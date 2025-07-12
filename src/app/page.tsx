"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "@/app/styles.module.scss";
import { welcomeMessages } from "@/contants";

export default function Home() {
  const [typingDone, setTypingDone] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    setMessage(welcomeMessages[randomIndex]);
    const timer = setTimeout(() => {
      setTypingDone(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!typingDone) return;

    const handleKeyPress = () => {
      router.push("/login");
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [typingDone]);

  return (
    <div>
      <div
        className={`${style.retro_box_content} ${
          typingDone ? style.glow_all : ""
        }`}
      >
        <h1>{message}</h1>
        <p className={style.typing}>Press any key to start interacting!</p>
      </div>
    </div>
  );
}
