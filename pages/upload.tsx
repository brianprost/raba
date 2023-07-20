import crypto from "crypto";
import { Bucket } from "sst/node/bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useCallback, useState } from "react";
import { DropzoneRootProps, useDropzone } from "react-dropzone";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import FileUploadForm from "@/components/FileUploadForm";

export async function getServerSideProps() {
  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: crypto.randomUUID(),
    Bucket: Bucket.fileUploads.bucketName,
  });
  const url = await getSignedUrl(new S3Client({}), command);

  return { props: { url } };
}

export default function UploadPage({ url }: { url: string }) {
  const { user, isLoading } = useUser();

  const [file, setFile] = useState<File | null>(null);
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

  if (user && !isLoading)
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
            <FileUploadForm
              url={url}
              file={file}
              isDragActive={isDragActive}
              getInputProps={getInputProps}
            />
          </div>
        </div>
      </>
    );
}
