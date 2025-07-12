import "./globals.scss";
import style from "@/app/styles.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="retro-body">
        <div className={style.retro_box}>{children}</div>
      </body>
    </html>
  );
}
