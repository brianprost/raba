import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Hanken_Grotesk } from "@next/font/google";

// fonts
const hanken_Grotesk = Hanken_Grotesk({
  subsets: ["latin"],  
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={hanken_Grotesk.className}>
      <Component {...pageProps} />
    </main>
  );
}
