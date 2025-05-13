import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

type UploadFilesProps = {
  onFileUpload: (files: (File | string)[]) => void;
  initialFiles?: (File | string)[];
  isDisabled?: boolean;
  label?: string;
  error?: string;
};

const UploadFiles = ({
  onFileUpload,
  initialFiles = [],
  isDisabled = false,
  label,
  error,
}: UploadFilesProps) => {
  const [files, setFiles] = useState<(File | string)[]>(initialFiles);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (!isDisabled) {
        const updatedFiles = [...files, ...acceptedFiles];
        setFiles(updatedFiles);
        onFileUpload(updatedFiles);
      }
    },
    multiple: true,
    disabled: isDisabled,
  });

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileUpload(updatedFiles);
  };

  return (
    <>
      {label && (
        <label className="block text-sm  text-typography-secondary mb-1">
          {label}
        </label>
      )}
      <div
        className={`w-full p-3 flex flex-wrap gap-3 h-auto min-h-36 rounded-[8px] ring-1 ${
          error ? "ring-red-500" : "ring-typography-secondary/30"
        }`}
      >
        {files.map((file, index) => {
          const previewUrl =
            typeof file === "string" ? file : URL.createObjectURL(file);
          return (
            <div
              key={index}
              className="relative w-32 h-32 bg-gray-100 rounded-md overflow-hidden"
            >
              <img
                src={previewUrl}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md hover:bg-red-500 transition text-red-500 hover:text-white"
              >
                <TrashIcon className="w-5 h-5 " />
              </button>
            </div>
          );
        })}
        {!isDisabled && (
          <div
            {...getRootProps()}
            className="w-32 h-32 bg-light-secondary flex justify-center items-center rounded-md hover:scale-105 duration-200 cursor-pointer hover:bg-black/20"
          >
            <input {...getInputProps()} />
            <PlusIcon className="h-10 text-gray-500" />
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600 text-left">{error}</p>}
    </>
  );
};
export default UploadFiles;
