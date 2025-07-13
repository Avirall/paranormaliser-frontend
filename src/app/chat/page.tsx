"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/chat/styles.module.scss";
import Loader from "@/components/Loader";
import LogoutButton from "@/components/LogoutButton";
import { FaMicrophone } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { get_response } from "@/utils";
import { Chat } from "@google/genai";

export default function CRTTerminal() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [fullname, setFullname] = useState("");
  const screenRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [responseLoading, setResponseLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    { user: string; ai: string }[]
  >([]);
  const [displayedText, setDisplayedText] = useState("");
  const [startChat, setStartChat] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);

  useEffect(() => {
    setDisplayedText("");

    if (!response) return;

    let index = 0;

    const interval = setInterval(() => {
      if (index <= response.length) {
        setDisplayedText(response.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [response]);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.onvoiceschanged = () => {
        console.log("Voices loaded:", window.speechSynthesis.getVoices());
      };
    }
    if (window.localStorage.getItem("is_authenticated") === "true") {
      setLoading(false);
    } else {
      router.push("/login");
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

  const get_or_setChat = async () => {
    if (!chat) {
      const newChat = await get_response();
      setChat(newChat);
      return newChat;
    }
    return chat;
  };

  const newChat = async () => {
    setMessage("");
    setResponse("");
    setDisplayedText("");
    setResponseLoading(false);
    setChatHistory([]);
    setStartChat(false);
    setChat(null);
    window.speechSynthesis.cancel();
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.5;
    utterance.pitch = 1.2;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((v) => v.name.includes("Zira"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleChatSubmit = async () => {
    const chat = await get_or_setChat();
    let aiResponse: any = null;
    const final_message = message;
    if (final_message && chat) {
      setResponse("");
      setDisplayedText("");
      setResponseLoading(true);
      aiResponse = await chat.sendMessage({ message: final_message });
      setResponse(aiResponse.text);

      setChatHistory((prev) => [
        ...prev,
        { user: final_message, ai: aiResponse.text },
      ]);
      setMessage("");
    }
    setResponseLoading(false);
    speak(aiResponse.text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleChatSubmit();
    }
  };

  // const handleUpload = () => {
  //   const fileInput = document.createElement("input");
  //   fileInput.type = "file";
  //   fileInput.accept = "image/*";
  //   fileInput.style.display = "none";

  //   fileInput.addEventListener("change", (e) => {
  //     const target = e.target as HTMLInputElement;
  //     const file = target.files?.[0];
  //     if (file) {
  //       console.log("File selected:", file.name);
  //     }
  //   });

  //   document.body.appendChild(fileInput);
  //   fileInput.click();
  //   document.body.removeChild(fileInput);
  // };

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

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.mainContainer}>
      <LogoutButton />
      <div className={styles.chatWindow}>
        {chatHistory.length > 0 && (
          <div className={styles.chatHistory}>
            {chatHistory.map((chat: any, index: number) => (
              <div key={index} className={styles.chatBubble}>
                <div className={styles.userMessage}>{chat.user}</div>
                <div className={styles.aiResponse}>{chat.ai}</div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.chatInputBox}>
          <div className={styles.crtContainer}>
            <div ref={screenRef} className={styles.screen}>
              <div className={styles.static}></div>

              {chatHistory.length === 0 && (
                <div className={styles.welcomeText}>
                  WELCOME BACK {fullname || "User"}!
                  <br />
                  WHAT&apos;S NEW?
                </div>
              )}

              {responseLoading && (
                <div className={styles.loadingText}>LOADING RESPONSE...</div>
              )}
            </div>
          </div>
          <div className={styles.Window}>
            {displayedText && (
              <div className={styles.responseText}>{displayedText}</div>
            )}
          </div>
          {!startChat && (
            <div
              className={styles.startChatButton}
              onClick={() => setStartChat(true)}
            >
              START CHAT
            </div>
          )}
          {startChat && (
            <div className={styles.chat_container}>
              <div className={styles.chatInputContainer}>
                <input
                  placeholder="Type your message here..."
                  value={message ?? ""}
                  disabled={responseLoading}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <div className={styles.icons}>
                <FaMicrophone color="black" />
              </div>
              <div className={styles.icons}>
                <IoMdCloudUpload color="black" />
              </div>
              <div className={styles.icons}>
                <IoSend
                  color="black"
                  onClick={
                    !responseLoading ? () => handleChatSubmit() : () => {}
                  }
                />
              </div>
            </div>
          )}
        </div>
        {startChat && (
          <div className={styles.chatFooter}>
            <button className={styles.newChatButton} onClick={newChat}>
              Start new Chat
            </button>
          </div>
        )}
        {!startChat && (
          <div className={styles.courageContainer}>
            <div className={styles.courage} onClick={handleCourageClick}></div>
          </div>
        )}
      </div>
    </div>
  );
}
