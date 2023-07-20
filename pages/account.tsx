import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";
import CopyToClipboard from "@/components/CopyToClipboard";
import type { AccountUploadsFromDb } from "@/components/types/AccountUploadsFromDb";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AccountPage() {
  const { user, error, isLoading } = useUser();

  const {
    data: uploads,
    error: uploadsError,
    isLoading: uploadsIsLoading,
  } = useSWR(
    `/api/getAccountUploads${user ? `?senderEmail=${user.email}` : ""}`,
    fetcher
  );

  if (isLoading || uploadsIsLoading) return <div>Loading...</div>;
  if (error || uploadsError) return <div>{error?.message}</div>;

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
        {uploads ? (
          <UploadsTable uploads={uploads} />
        ) : (
          <h2 className="text-4xl font-semibold mt-20">No uploads...yet</h2>
        )}
      </div>
    )
  );
}

export function UploadsTable({ uploads }: { uploads: AccountUploadsFromDb[] }) {
  return (
    <div className="container mx-auto overflow-x-auto">
      <h1 className="text-center font-bold mt-24 text-4xl underline underline-offset-2 mb-12">
        Your uploads:
      </h1>
      <table className="table">
        <thead>
          <tr className="text-2xl font-semibold">
            <th>Expires In</th>
            <th>Recipient Email</th>
            <th>Title</th>
            <th>Description</th>
            <th>File Link</th>
          </tr>
        </thead>
        <tbody>
          {uploads?.map((upload: AccountUploadsFromDb) => (
            <tr key={upload.uploadId}>
              <td>
                {Math.ceil(
                  (new Date(upload.expiresOn).getTime() -
                    new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </td>
              <td>{upload.recipientEmail}</td>
              <td>{upload.title}</td>
              <td>{upload.description}</td>
              <td>
                {!(upload.fileUrl == "") ? (
                  <CopyToClipboard downloadUrl={`${window.location.origin}/uploads/${upload.uploadId}`}>
                    <button className="btn btn-primary">
                      Copy to clipboard
                    </button>
                  </CopyToClipboard>
                ) : (
                  "File expired"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
