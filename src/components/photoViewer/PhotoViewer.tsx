import { useState } from "react";

type PhotoViewerProps = {
  images?: (string | File)[];
};

export default function PhotoViewer({ images = [] }: PhotoViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getImageSrc = (image: string | File) => {
    return typeof image === "string" ? image : URL.createObjectURL(image);
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <div className="relative w-full h-56 bg-gray-200 rounded-lg overflow-hidden">
        {images.length > 0 ? (
          <img
            src={getImageSrc(images[currentIndex])}
            alt={`Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}

        {/* Navigation Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-transparent px-3 py-1 rounded-full flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
