import Head from "next/head";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";

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
          content="HumRRO's secure file transfer service."
        />
        <meta property="og:title" content={"Raba - Secure File Transfer"} />
        <meta property="og:image" content={"raba-logo.png"} />
        <link rel="icon" href="/raba-logo.png" />
      </Head>
      <div className="hero h-full">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="container mx-auto lg:mx-32 text-center">
            <div className="flex flex-col items-center gap-3">
              <Image
                src="/../public/raba-logo.png"
                alt="raba-logo"
                width={150}
                height={150}
              />
              <h1 className="text-8xl font-bold drop-shadow-md">Raba</h1>
            </div>
            <p className="py-6 text-2xl font-light">
              {
                "Meet Raba, HumRRO's new file sharing service. Raba is a secure portal for sharing files between HumRRO staff and clients. Raba is hosted on HumRRO's AWS infrastructure and is designed to be highly available and secure."
              }
            </p>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/auth/login">
              <button className="btn btn-primary btn-md">Get Started</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}