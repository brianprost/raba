import "@/styles/globals.css";
import { useContext, createContext, useState } from "react";
import type { AppProps } from "next/app";
import { Hanken_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
// import { SessionProvider } from "next-auth/react";
import { NavbarToggles } from "@/components/types/NavbarToggles";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { GoogleAnalytics } from "nextjs-google-analytics";

// fonts
const hanken_Grotesk = Hanken_Grotesk({
  subsets: ["latin"],
});

export const NavbarTogglesContext = createContext({} as NavbarToggles);
export const ToastContext = createContext(
  {} as {
    showToastMessage: boolean;
    setShowToastMessage: (show: boolean) => void;
    toastMessageText: string;
    setToastMessageText: (text: string) => void;
  }
);

export default function App({ Component, pageProps }: AppProps) {
  const [showTitle, setShowTitle] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(true);
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [toastMessageText, setToastMessageText] = useState("");

  return (
    <ToastContext.Provider
      value={{
        showToastMessage: showToastMessage,
        toastMessageText: toastMessageText,
        setShowToastMessage,
        setToastMessageText,
      }}
    >
      <UserProvider>
        <NavbarTogglesContext.Provider
          value={{
            showTitle,
            setShowTitle,
            showAccountMenu,
            setShowAccountMenu,
          }}
        >
          <main className={hanken_Grotesk.className + " bg-neutral-300"}>
            {/* <div className="h-[5vh]">
              <Navbar />
            </div> */}
            <div className="h-[100vh]">
              <GoogleAnalytics gaMeasurementId="G-G96VMLZVX9" trackPageViews />
              <Component {...pageProps} />
            </div>
          </main>
        </NavbarTogglesContext.Provider>
      </UserProvider>
      {showToastMessage && (
        <div className="toast toast-bottom toast-end">
          <div className="alert alert-success">
            <div>
              <span>
               {toastMessageText}
              </span>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
