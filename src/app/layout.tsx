import "./globals.scss";
import style from "@/app/styles.module.scss";
import Authenticate from "@/components/Authenticate";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="retro-body">
        <div className={style.retro_box}>
          <Authenticate>{children}</Authenticate>
        </div>
      </body>
    </html>
  );
}
