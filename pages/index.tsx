import Head from "next/head";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

type Props = {};

export default function Home({}: Props) {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  if (user && !isLoading && !error) {
    router.push("/upload");
  }

  return (
    <>
      <Head>
        <title>Raba - Secure File Transfer</title>
        <meta
          name="description"
          content="A self-hosted secure file transfer service."
        />
        <meta property="og:title" content={"Raba - Secure File Transfer"} />
        <meta property="og:image" content={"raba-logo.png"} />
        <link rel="icon" href="/raba-logo.png" />
      </Head>
      <div className="hero h-full">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="container mx-auto lg:mx-32 text-center">
            <div className="flex flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="raba-logo.png"
                alt="raba-logo"
                width={150}
                height={150}
              />
              <h1 className="text-8xl font-bold drop-shadow-md">Raba</h1>
            </div>
            <p className="py-6 text-xl font-light">
              {
                "Hi friend! Thanks for visiting Raba. This was a side project of mine that I made after noticing a need at HumRRO for sharing sensitive files between researchers and our clients. Unforunately, after 4 months of active development and sharing updates with my team, not a single person used the app. Additionally, on July 21st, the IT team enabled functionality in SharePoint workspaces that changed company policy to require HumRROvians to use such functionality for the exact use case this app was designed for."
              }
              <br />
              <br />
              {
                "Making an app like this was on my bucket list as a developer. Given the dead end it has arrived at, all further development will be focused on personal use cases. As such, I have removed the service from HumRRO's servers. If you would like to follow or contribute to development of this app, please visit the GitHub repo below."
              }
            </p>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <Link href="https://github.com/brianprost/raba">
              <button className="btn btn-primary btn-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 496 512"
                >
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
                GitHub
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
