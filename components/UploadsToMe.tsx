import React from "react";
import useSWR from "swr";
import { UploadToMe } from "@/components/types/AccountUploadsFromDb";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UploadsToMe({ userEmail }: { userEmail: string }) {
  const {
    data: uploads,
    error: uploadsError,
    isLoading: uploadsIsLoading,
  } = useSWR(`/api/getUploadsToMe${`?recipientEmail=${userEmail}`}`, fetcher);
  
  if (uploadsIsLoading) return <div>Loading...</div>;
  if (uploadsError) return <div>{uploadsError?.message}</div>;
  return (
    <>
      <h1 className="text-center font-bold mt-24 text-4xl underline underline-offset-2 mb-12">
        Shared with me:
      </h1>
      <table className="table">
        <thead>
          <tr className="text-2xl font-semibold">
            <th>Expires In</th>
            <th>Sent By</th>
            <th>Title</th>
            <th>Description</th>
            <th>File Link</th>
          </tr>
        </thead>
        <tbody>
          {uploads?.map((upload: UploadToMe) => (
            <tr key={upload.uploadId}>
              <td>
                {Math.ceil(
                  (new Date(upload.expiresOn).getTime() -
                    new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </td>
              <td>{upload.senderEmail}</td>
              <td>{upload.title}</td>
              <td>{upload.description}</td>
              <td>
                {!(upload.fileUrl == "") ? (
                  <Link href={`/uploads/${upload.uploadId}`}>
                    <button className="btn btn-primary">Go to download</button>
                  </Link>
                ) : (
                  "File expired"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
