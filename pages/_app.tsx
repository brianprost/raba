import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Hanken_Grotesk } from "@next/font/google";
import Navbar from "@/components/Navbar";

// fonts
const hanken_Grotesk = Hanken_Grotesk({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={hanken_Grotesk.className + " bg-base-200"}>
      <div className="h-[5vh]">
        <Navbar />
      </div>
      <div className="h-[95vh]">
        <Component {...pageProps} />
      </div>
    </main>
  );
}
