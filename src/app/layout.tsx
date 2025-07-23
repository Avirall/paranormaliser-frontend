import "./globals.scss";
import style from "@/app/styles.module.scss";
import Authenticate from "@/components/Authenticate";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <div className={style.retro_box}>
          <Authenticate>{children}</Authenticate>
        </div>
      </body>
    </html>
  );
}
