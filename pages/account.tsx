import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";
import CopyToClipboard from "@/components/CopyToClipboard";
import type { MyUpload } from "@/components/types/AccountUploadsFromDb";
import MyUploads from "@/components/MyUploads";
import UploadsToMe from "@/components/UploadsToMe";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AccountPage() {
  const { user, error, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState("uploads");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error?.message}</div>;

  return (
    user && (
      <div className="flex h-full flex-col justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user.picture!} alt={user.name!} className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{user.nickname}</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="mt-12">
          <div className="tabs flex justify-center">
            <a
              className={`tab tab-lg tab-lifted ${
                activeTab === "uploads" ? "tab-active" : ""
              }`}
              onClick={() => handleTabClick("uploads")}
            >
              My Uploads
            </a>
            <a
              className={`tab tab-lg tab-lifted ${
                activeTab === "shared" ? "tab-active" : ""
              }`}
              onClick={() => handleTabClick("shared")}
            >
              Shared With Me
            </a>
          </div>
          {activeTab === "uploads" ? (
            <MyUploads userEmail={user.email!} />
          ) : (
            <UploadsToMe userEmail={user.email!} />
          )}
        </div>
      </div>
    )
  );
}
