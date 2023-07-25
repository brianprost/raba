import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import type { DropzoneRootProps } from "react-dropzone";
import { useUser } from "@auth0/nextjs-auth0/client";
import type { FormData } from "@/components/types/FormData";
import CopyToClipboard from "@/components/CopyToClipboard";
import { ToastContext } from "@/pages/_app";

export default function FileUploadForm({
  url,
  file,
  isDragActive,
  getInputProps,
}: {
  url: string;
  file: File | null;
  isDragActive: boolean;
  getInputProps: () => DropzoneRootProps["getInputProps"];
}) {
  const { user, isLoading } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const emailValidation = {
    required: !user,
  };
  const [isUploading, setIsUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const {
    showToastMessage,
    toastMessageText,
    setToastMessageText,
    setShowToastMessage,
  } = useContext(ToastContext);

  const onSubmit = async (data: FormData) => {
    // TODO this is hacky
    user && (data.senderEmail = user.email!);
    setIsUploading(true);
    try {
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

      const upload = await fetch(url, {
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

      const uploadDeets = {
        uploadId: upload.url.split("?")[0].split("/").pop()!,
        senderEmail: data.senderEmail,
        recipientEmail: data.recipientEmail,
        title: data.title,
        description: data.description,
        // chargeCode: data.chargeCode,
        fileUrl: upload.url.split("?")[0],
      };
      const dbWrite = await fetch("/api/recordToDb", {
        method: "POST",
        body: JSON.stringify(uploadDeets),
      });
      setDownloadUrl(
        `${window.location.origin}/uploads/${uploadDeets.uploadId}`
      );
      setToastMessageText(
        "File was uploaded successfully, but no emails were sent. Still waiting on getting a non-randomized domain!"
      );
      setShowToastMessage(true);
      setTimeout(() => {
        setShowToastMessage(false);
      }, 3000);
    } catch (error) {}
    setIsUploading(false);
  };

  return (
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
            {...register("senderEmail", {
              required: emailValidation.required,
            })}
            className="input input-bordered"
            type="email"
            placeholder="Your Email"
            disabled={!!user?.email}
            value={user?.email ?? ""}
          />
          {errors.senderEmail && (
            <span className="text-humrroOrange">Sender email is required.</span>
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
            <span className="text-humrroOrange">Description is required.</span>
          )}

          <div className="form-control my-6">
            {!downloadUrl ? (
              <button
                type="submit"
                className="btn btn-primary"
                // disabled={!file}
              >
                {isUploading ? (
                  <>
                    <i className="loading loading-spinner" /> Uploading...
                  </>
                ) : (
                  "Upload File"
                )}
              </button>
            ) : (
              <button
                type="reset"
                className="btn btn-accent"
                onClick={() => {
                  // reload the page
                  window.location.reload();
                }}
              >
                Upload Another File
              </button>
            )}
            <p className="text-center text-sm mt-4">
              Note: Raba is still in beta. Please do not upload CUI/PII or any
              critical data. All data shared is{" "}
              <b>subject to deletion at any time without notice.</b>
            </p>
          </div>
        </form>
        {downloadUrl && (
          <div className="border border-humrroForestGreen rounded-lg py-4">
            <h5 className="text-xl text-center text-humrroForestGreen underline underline-offset-4 font-bold mb-4">
              {"Your file's link:"}
            </h5>
            <CopyToClipboard downloadUrl={downloadUrl}>
              <p className="text-center text-sm cursor-pointer flex justify-center items-center flex-col">
                {downloadUrl ?? "https://humrro.org"}
              </p>
            </CopyToClipboard>
          </div>
        )}
      </div>
    </div>
  );
}
