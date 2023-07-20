import { useRouter } from "next/router";
import useSWR from "swr";
import type { UploadDbRecord } from "@/components/types/UploadDbRecord";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UploadsPage() {
  const router = useRouter();

  const {
    data: upload,
    error: getUploadError,
    isLoading: loadingUpload,
  } = useSWR(
    `/api/getUploadById${
      router.query.slug ? `?uploadId=${router.query.slug}` : ""
    }`,
    fetcher
  );
  if (loadingUpload) return <div>Loading...</div>;
  if (getUploadError) return <div>{getUploadError?.message}</div>;

  return (
    <div className="hero h-[95vh] bg-base-200">
      <div className="hero-content flex-col lg:gap-16 lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{"Here's your file..."}</h1>
          <p className="py-6 text-lg">
            {
              "Well? What are you waiting for? You got what you wanted! Go to her...just go!"
            }
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <figure className="px-10 pt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/200"
              alt="random photo from picsum"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{upload.title}</h2>
            <p className="mt-1 mb-4">{upload.description}</p>
            <div className="card-actions">
              <a href={upload.fileUrl}>
                <button className="btn btn-primary">Download</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
