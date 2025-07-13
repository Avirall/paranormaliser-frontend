"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";

import Loader from "@/components/Loader";
import LogoutButton from "@/components/LogoutButton";

export default function CRTTerminal() {
  const [message, setMessage] = useState("");
  const [fullname, setFullname] = useState("");
  const chatInputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // Random flicker effect
  useEffect(() => {
    if (window.localStorage.getItem("is_authenticated") === "true") {
      setLoading(false);
    }

    const flickerInterval = setInterval(() => {
      setFullname(window.localStorage.getItem("fullname") || "User");
      if (Math.random() < 0.1 && screenRef.current) {
        screenRef.current.style.opacity = "0.9";
        setTimeout(() => {
          if (screenRef.current) {
            screenRef.current.style.opacity = "1";
          }
        }, 50);
      }
    }, 2000);

    return () => clearInterval(flickerInterval);
  }, []);

  const handleChatSubmit = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleChatSubmit();
    }
  };

  const handleUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";

    fileInput.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        console.log("File selected:", file.name);
      }
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  const handleCourageClick = () => {
    const courageElement = document.querySelector(
      `.${styles.courage}`
    ) as HTMLElement;
    if (courageElement) {
      courageElement.style.animationDuration = "3s";
      setTimeout(() => {
        courageElement.style.animationDuration = "6s";
      }, 10000);
    }
  };

  return (
    <div className={styles.crtContainer}>
      <div ref={screenRef} className={styles.screen}>
        <div className={styles.static}></div>

        <button className={styles.uploadBtn} onClick={handleUpload}>
          📤 upload image
        </button>

        <div className={styles.welcomeText}>
          WELCOME BACK
          <br />
          TWIT! WHAT&apos;S NEW?
        </div>

        <div className={styles.chatContainer}>
          <input
            ref={chatInputRef}
            type="text"
            className={styles.chatInput}
            placeholder="type to chat"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <span className={styles.micIcon}>🎤</span>
          <button className={styles.sendBtn} onClick={handleChatSubmit}>
            ▶
          </button>
        </div>

        <div className={styles.courageContainer}>
          <div className={styles.courage} onClick={handleCourageClick}></div>
        </div>
      </div>
    </div>
  );
}
