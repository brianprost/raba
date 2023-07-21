import React from "react";
import useSWR from "swr";
import CopyToClipboard from "@/components/CopyToClipboard";
import { UploadToMe } from "@/components/types/AccountUploadsFromDb";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UploadsToMe({ userEmail }: { userEmail: string }) {
  const {
    data: uploads,
    error: uploadsError,
    isLoading: uploadsIsLoading,
  } = useSWR(`/api/getUploadsToMe${`?recipientEmail=${userEmail}`}`, fetcher);
  return (
    <div className="container mx-auto overflow-x-auto">
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
                  <CopyToClipboard
                    downloadUrl={`${window.location.origin}/uploads/${upload.uploadId}`}
                  >
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
