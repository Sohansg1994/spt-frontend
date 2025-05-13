import { CheckCircleIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

type DropZoneProps = {
  onFileUpload: (file: File) => void;
  title?: string;
  additionalInfo?: string;
  error?: string;
};

const Dropzone = ({
  onFileUpload,
  error,
  additionalInfo,
  title = "Click to upload files or Drag and drop",
}: DropZoneProps) => {
  const [fileUploaded, setFileUploaded] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        onFileUpload(acceptedFiles[0]);
        setFileUploaded(true);
      }
    },
    multiple: false, // Allow only one file
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`border rounded-xl  ${
          error ? "border-red-500" : "border-typography-secondary/30 "
        } p-3 group cursor-pointer mb-2`}
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-center gap-3 dark:text-white">
          {fileUploaded && !error ? (
            <CheckCircleIcon className="w-8 text-green-500" />
          ) : (
            <CloudArrowUpIcon
              className={`w-8 ${
                error
                  ? "text-red-500"
                  : "text-typography-secondary/30 group-hover:text-primaryDarkBlue"
              } duration-200`}
            />
          )}
          <div>
            <div
              className={`text-sm ${
                fileUploaded && !error
                  ? "text-green-500"
                  : error
                    ? "text-red-500"
                    : "text-typography-secondary/30 group-hover:text-primaryDarkBlue"
              } duration-200`}
            >
              {fileUploaded && !error
                ? "File uploaded successfully"
                : `${title}`}
            </div>
            {additionalInfo && (
              <div className="flex items-center justify-center text-typography-secondary/30 text-xs ">
                {additionalInfo}
              </div>
            )}
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};

export default Dropzone;
