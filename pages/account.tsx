import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type AccountUploadsFromDb = {
  uploadId: string;
  recipientEmail: string;
  title: string;
  description: string;
  chargeCode?: string;
  fileUrl: string;
  createdAt: string;
  expiresOn: string;
};

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

  console.log(uploads);

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
          <>
            <h1 className="font-bold mt-24 text-4xl underline underline-offset-2 mb-12">
              Your uploads:
            </h1>
            <div className="container mx-auto overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Expires On</th>
                    <th>Upload Id</th>
                    <th>Recipient Email</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>File Url</th>
                  </tr>
                </thead>
                <tbody>
                  {uploads?.map((upload: AccountUploadsFromDb) => (
                    <tr key={upload.uploadId}>
                      <td>{upload.expiresOn}</td>
                      <td>{upload.uploadId}</td>
                      <td>{upload.recipientEmail}</td>
                      <td>{upload.title}</td>
                      <td>{upload.description}</td>
                      <td>
                        {!(upload.fileUrl == "") ? (
                          <a
                            href={upload.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                          >
                            Download
                          </a>
                        ) : (
                          "File expired"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h2 className="text-4xl font-semibold mt-20">No uploads...yet</h2>
        )}
      </div>
    )
  );
}
