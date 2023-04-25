import "./globals.css";
import { Kanit } from "@next/font/google";

const kanit = Kanit({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`${kanit.className} mx-20 my-8`}>
        <nav className="flex justify-around pt-4 pb-10">
          <img
            src="logo.png"
            alt="logo cannot be displayed"
            width={70}
            height={70}
          ></img>
          <a
            className="text-4xl font-bold hover:text-sky-300 duration-300"
            href="./"
          >
            Ethan's Anime Archive
          </a>
          <a
            className="text-4xl font-bold hover:text-sky-300 duration-300"
            href="/about"
          >
            About
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
