import React, { use, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

type AccountUploadsFromDb = {
  uploadId: string;
  recipientEmail: string;
  title: string;
  description: string;
  chargeCode?: string;
  fileUrl: string;
};

export default function AccountPage({
  uploads,
}: {
  uploads: AccountUploadsFromDb[];
}) {
  const { user, error, isLoading } = useUser();
  const [accountUploads, setAccountUploads] =
    useState<AccountUploadsFromDb[]>();

  useEffect(() => {
    const fetchAccountUploads = async () => {
      const res = await fetch("/api/getAccountUploads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderEmail: await user?.email }),
        // body: JSON.stringify({ senderEmail: "bprost+zepzom@humrro.org" }),
      });
      const uploads = await res.json();
      return uploads;
    };
    fetchAccountUploads().then(setAccountUploads);
  }, [user?.email]);

  console.log("uploads: ", uploads);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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
        <p className="text-center mt-24 text-2xl">
          Eventually you will be able to see all of your uploads here...
        </p>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Upload Id</th>
                <th>Sender Email</th>
                <th>Recipient Email</th>
                <th>Title</th>
                <th>Description</th>
                <th>Charge Code</th>
                <th>File Url</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload) => (
                <tr key={upload.uploadId}>
                  <td>{upload.uploadId}</td>
                  <td>{upload.recipientEmail}</td>
                  <td>{upload.title}</td>
                  <td>{upload.description}</td>
                  {/* <td>{upload.chargeCode}</td> */}
                  <td>{upload.fileUrl}</td>
                </tr>
              ))}
              {/* <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}

export async function getServerSideProps(context: any) {
  const user = { email: "bprost+zepzom@humrro.org" };
  const user = context.req.user;
  const res = await fetch(`${process.env.AUTH0_BASE_URL}/api/getAccountUploads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ senderEmail: user?.email }),
    // body: JSON.stringify({ senderEmail: "bprost+zepzom@humrro.org" }),
  });
  const uploads = await res.json();
  return {
    props: {
      uploads,
    },
  };
}
