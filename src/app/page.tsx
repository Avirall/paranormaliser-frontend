"use client";
import { useEffect, useState } from "react";
import style from "@/app/styles.module.scss";

export default function Home() {
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const audio = new Audio("frontend\\assets\\typing.wav");
    audio.volume = 0.3;

    let interval: NodeJS.Timeout;

    // Simulate key clicks during typing
    const playTypingSound = () => {
      interval = setInterval(() => {
        const click = audio.cloneNode() as HTMLAudioElement;
        click.play();
      }, 80); // plays every 80ms
    };

    playTypingSound();

    const timer = setTimeout(() => {
      clearInterval(interval);
      setTypingDone(true);
    }, 2500); // match animation duration

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className={style.retro_box}>
        <div
          className={`${style.retro_box_content} ${
            typingDone ? style.glow_all : ""
          }`}
        >
          <div>
            <h1>Welcome to Courage's Computer</h1>
          </div>
          <div>
            <p className={style.typing}>Press any key to start interacting!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
