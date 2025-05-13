import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type ImageUploadProps = {
  onFileUpload: (file: File) => void;
  title?: string;
  additionalInfo?: string;
  error?: string;
  defaultFile?: File | string;
};

const ImageUpload = ({
  onFileUpload,
  error,
  additionalInfo,
  title = "Click to upload files or Drag and drop",
  defaultFile,
}: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileSetManually, setFileSetManually] = useState(false);

  useEffect(() => {
    if (!defaultFile || fileSetManually) return;

    if (typeof defaultFile === "string") {
      // Remote image or base64
      setPreviewUrl(defaultFile);
    } else {
      // File object
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(defaultFile);
    }
  }, [defaultFile, fileSetManually]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        onFileUpload(file);
        setFileSetManually(true);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`relative border rounded-xl overflow-hidden h-40 group cursor-pointer ${
          error ? "border-red-500" : "border-typography-secondary/30"
        }`}
      >
        <input {...getInputProps()} />

        {/* Preview Image */}
        {previewUrl && !error && (
          <div className="w-full h-full flex items-center px-1">
            <img
              src={previewUrl}
              alt="Uploaded preview"
              className="object-contain max-h-60 w-full mx-auto rounded-md"
            />
          </div>
        )}

        {/* Overlay */}
        {previewUrl && !error && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium z-10">
            Click or drag to change image
          </div>
        )}

        {/* Default content */}
        {!previewUrl && (
          <div className="flex flex-col items-center justify-center text-center h-full p-4">
            <CloudArrowUpIcon
              className={`w-8 h-8 mb-2 ${
                error
                  ? "text-red-500"
                  : "text-typography-secondary/30 group-hover:text-primaryDarkBlue"
              } duration-200`}
            />
            <div
              className={`text-sm ${
                error
                  ? "text-red-500"
                  : "text-typography-secondary/30 group-hover:text-primaryDarkBlue"
              } duration-200`}
            >
              {title}
            </div>
            {additionalInfo && (
              <div className="text-xs text-typography-secondary/30 mt-1">
                {additionalInfo}
              </div>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};

export default ImageUpload;
