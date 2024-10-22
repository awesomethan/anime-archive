"use client";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Kanit } from "next/font/google";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

const kanit = Kanit({
  weight: ["400", "700"],
  subsets: ["latin"],
});

// Child component inside ClerkProvider where we can use Clerk hooks
function AppContent({ children }) {
  const [clerkLoaded, setClerkLoaded] = useState(false);
  const { isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      setClerkLoaded(true);
    }
  }, [isLoaded]);

  // Show "Loading..."" until Clerk is fully loaded
  if (!clerkLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Render the full page content once Clerk is loaded
  return (
    <>
      <nav className="flex justify-around px-6 pt-10 h-12/100 w-screen">
        <img
          src="logo.png"
          alt="logo cannot be displayed"
          className="w-16 h-auto sm:w-20 md:w-24 lg:w-28 xl:w-32"
        />
        <a
          className="text-4xl font-bold duration-300 hover:text-sky-300"
          href="./"
        >
          Ethan's Anime Archive
        </a>
        <a
          className="text-4xl font-bold duration-300 hover:text-sky-300"
          href="/myAnimeList"
        >
          My List
        </a>
        <a
          className="text-4xl font-bold duration-300 hover:text-sky-300"
          href="/about"
        >
          About
        </a>
        <div>
          <SignedOut>
            <SignInButton className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" />
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
      </nav>
      {children}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <head>
          <title>Ethan's Anime Archive</title>
        </head>
        <body className={`${kanit.className} h-screen w-screen`}>
          <AppContent>{children}</AppContent>
        </body>
      </html>
    </ClerkProvider>
  );
}
