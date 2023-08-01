import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Hanken_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "nextjs-google-analytics";

// fonts
const hanken_Grotesk = Hanken_Grotesk({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={hanken_Grotesk.className}>
      <div className="h-[100vh]">
        <GoogleAnalytics gaMeasurementId="G-G96VMLZVX9" trackPageViews />
        <Component {...pageProps} />
      </div>
    </main>
  );
}
