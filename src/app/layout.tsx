import "./globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courage's Computer",
  description: "The most sarcastic computer in Nowhere",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="retro-body">
        <audio id="beep-sound" src="/sounds/beep.mp3" />
        <audio id="error-sound" src="/sounds/error.mp3" />
        <audio id="typing-sound" src="/sounds/typing.mp3" />
        {children}
      </body>
    </html>
  );
}
