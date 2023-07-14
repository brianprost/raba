import "@/styles/globals.css";
import { useContext, createContext, useState } from "react";
import type { AppProps } from "next/app";
import { Hanken_Grotesk } from "@next/font/google";
import Navbar from "@/components/Navbar";
// import { SessionProvider } from "next-auth/react";
import { NavbarToggles } from "@/components/types/NavbarToggles";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { GoogleAnalytics } from "nextjs-google-analytics"

// fonts
const hanken_Grotesk = Hanken_Grotesk({
  subsets: ["latin"],
});

export const NavbarTogglesContext = createContext({} as NavbarToggles);

export default function App({ Component, pageProps }: AppProps) {
  const [showTitle, setShowTitle] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(true);

  return (
    <UserProvider>
      <NavbarTogglesContext.Provider
        value={{ showTitle, setShowTitle, showAccountMenu, setShowAccountMenu }}
      >
        <main className={hanken_Grotesk.className + " bg-base-200"}>
          <div className="h-[5vh]">
            <Navbar />
          </div>
          <div className="h-[95vh]">
            <GoogleAnalytics gaMeasurementId="G-G96VMLZVX9" trackPageViews />
            <Component {...pageProps} />
          </div>
        </main>
      </NavbarTogglesContext.Provider>
    </UserProvider>
  );
}
