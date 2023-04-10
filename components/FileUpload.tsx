import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { DropzoneRootProps, useDropzone } from "react-dropzone";
import axios from "axios";

type FormData = {
  senderEmail: string;
  recipientEmail: string;
  title: string;
  description: string;
};

export const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
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

    const response = await axios.post(
      "https://ial1qe0bgg.execute-api.us-east-1.amazonaws.com/dummyApiUrlEndpoint",
      formData
    );
    const fileAccessUrl = response.data.fileAccessUrl;
    if (fileAccessUrl) {
      alert(
        "File uploaded successfully. Click okay to view it in the browser."
      );
      window.location.href = fileAccessUrl;
    }
    console.log(response);
  };

  return (
    <div
      {...getRootProps()}
      className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans"
    >
      {isDragActive && (
        <div className="absolute inset-0 bg-humrroForestGreen bg-opacity-70 flex items-center justify-center text-white text-7xl">
          Drop to upload...
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-96 bg-gray-200 p-10 rounded-lg shadow-md">
        <h1 className="text-center text-4xl text-humrroForestGreen">RABA</h1>
        <div className="p-4 border border-humrroLimeGreen rounded-lg">
          <p className="my-2 text-center">
            Click or drag a file here to upload
          </p>
          <input {...getInputProps()} />
          {file && <p className="text-sm text-humrroBlue">{file.name}</p>}
        </div>
        <input
          {...register("senderEmail", { required: true })}
          className="w-full p-4 border border-gray-300 rounded-lg"
          type="email"
          placeholder="Your Email"
        />
        {errors.senderEmail && (
          <span className="text-humrroOrange">Sender email is required.</span>
        )}
        <input
          {...register("recipientEmail", { required: true })}
          className="w-full p-4 border border-gray-300 rounded-lg"
          type="email"
          placeholder="Recipient's Email"
        />
        {errors.recipientEmail && (
          <span className="text-humrroOrange">
            Recipient email is required.
          </span>
        )}

        <input
          {...register("title", { required: true })}
          className="w-full p-4 border border-gray-300 rounded-lg"
          type="text"
          placeholder="Title"
        />
        {errors.title && (
          <span className="text-humrroOrange">Title is required.</span>
        )}

        <textarea
          {...register("description", { required: true })}
          className="w-full p-4 border border-gray-300 rounded-lg"
          placeholder="Description"
          rows={3}
        />
        {errors.description && (
          <span className="text-humrroOrange">Description is required.</span>
        )}

        <button
          type="submit"
          className="w-full bg-humrroBlue text-white py-2 hover:bg-humrroNavy focus:outline-none rounded-lg"
        >
          Upload File
        </button>
      </form>
    </div>
  );
};
