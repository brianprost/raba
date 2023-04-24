import crypto from "crypto";
import { Bucket } from "sst/node/bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { DropzoneRootProps, useDropzone } from "react-dropzone";
import Head from "next/head";
// import { useSession, signIn, signOut } from "next-auth/react";

type FormData = {
  senderEmail: string;
  recipientEmail: string;
  title: string;
  description: string;
};

export async function getServerSideProps() {
  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: crypto.randomUUID(),
    Bucket: Bucket.public.bucketName,
  });
  const url = await getSignedUrl(new S3Client({}), command);

  return { props: { url } };
}

export default function Home({ url }: { url: string }) {
  // const {data: session, status} = useSession();

  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setIsDragActive(false);
  }, []);

  const { getRootProps, getInputProps }: DropzoneRootProps = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    noClick: true,
    maxSize: 2 * 1024 * 1024 * 1024, // 2GB
  });

  const [tooltipText, setTooltipText] = useState<string | null>(
    "🔗 Click to copy to clipboard"
  );

  const onSubmit = async (data: FormData) => {
    
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("senderEmail", data.senderEmail);
    formData.append("recipientEmail", data.recipientEmail);
    formData.append("title", data.title);
    formData.append("description", data.description);

    const image = await fetch(url, {
      body: file,
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="${file.name}"`,
        "Sender-Email": data.senderEmail,
        "Recipient-Email": data.recipientEmail,
        "File-Title": data.title,
        "File-Description": data.description,
      },
    });

    setDownloadUrl(image.url.split("?")[0]);
  };

  return (
    <>
      <Head>
        <title>Raba - Secure File Transfer</title>
        <meta
          name="description"
          content="HumRRO's secure file transfer service."
        />
        <link rel="icon" href="/raba-logo.png" />
      </Head>
      <div {...getRootProps()} className="hero h-full">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left lg:pl-10">
            <div className="flex items-end gap-3">
              {/* <Image src="/../public/raba-logo.png" alt="raba-logo" width={150} height={150} /> */}
              <h1 className="text-8xl font-bold drop-shadow-md">Raba</h1>
            </div>
            <p className="py-6 text-xl">
              {
                "Meet Raba, HumRRO's new file sharing service. Raba is a secure portal for sharing files between HumRRO staff and clients. Raba is hosted on HumRRO's AWS infrastructure and is designed to be highly available and secure."
              }
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            {isDragActive && (
              <div className="absolute inset-0 bg-accent bg-opacity-70 flex items-center justify-center text-white text-2xl font-sans text-center p-4 rounded-lg">
                Drop to upload...
              </div>
            )}
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} className="form-control">
                <div className="p-4 border border-primary rounded-lg">
                  <p className="my-2 text-center underline underline-offset-2">
                    Drag and drop a file here to upload
                  </p>
                  <input {...getInputProps()} />
                  {file && <p className="text-sm text-center">{file.name}</p>}
                </div>
                <div className="divider px-20 pt-4 pb-1" />
                <label htmlFor="senderEmail" className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  {...register("senderEmail", { required: true })}
                  className="input input-bordered"
                  type="email"
                  placeholder="Your Email"
                />
                {errors.senderEmail && (
                  <span className="text-humrroOrange">
                    Sender email is required.
                  </span>
                )}
                <label htmlFor="recipientEmail" className="label mt-2">
                  <span className="label-text">{"Recipient's Email"}</span>
                </label>
                <input
                  {...register("recipientEmail", { required: true })}
                  className="input input-bordered"
                  type="email"
                  placeholder="Recipient's Email"
                />
                {errors.recipientEmail && (
                  <span className="text-humrroOrange">
                    Recipient email is required.
                  </span>
                )}

                <label htmlFor="title" className="label mt-2">
                  <span className="label-text">Title</span>
                </label>
                <input
                  {...register("title", { required: true })}
                  className="input input-bordered"
                  type="text"
                  placeholder="Title"
                />
                {errors.title && (
                  <span className="text-humrroOrange">Title is required.</span>
                )}
                <label htmlFor="description" className="label mt-2">
                  <span className="label-text">Description</span>
                </label>

                <textarea
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered"
                  placeholder="Description"
                  rows={3}
                />
                {errors.description && (
                  <span className="text-humrroOrange">
                    Description is required.
                  </span>
                )}

                <div className="form-control my-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    // disabled={!file}
                  >
                    Upload File
                  </button>
                </div>
              </form>
              {downloadUrl && (
                <div className="border border-humrroForestGreen rounded-lg py-4">
                  <h5 className="text-xl text-center text-humrroForestGreen underline underline-offset-4 font-bold mb-4">
                    {"Your file's link:"}
                  </h5>
                  <div
                    className="tooltip tooltip-bottom flex"
                    data-tip={tooltipText}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        downloadUrl ?? "https://humrro.org"
                      );
                      setTooltipText("✅ Copied!");
                      setTimeout(() => {
                        setTooltipText("🔗 Click to copy to clipboard");
                      }, 5000);
                    }}
                  >
                    <p className="text-center text-sm cursor-pointer flex justify-center items-center flex-col">
                      {downloadUrl ?? "https://humrro.org"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {downloadUrl && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <div>
              <span>
                File was uploaded, but no emails were sent. Ya boi Brian needs a
                domain for that!
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
