export default function PopUpSkelton() {
  return (
    <div className="bg-light-surface rounded-2xl   p-5 w-full animate-pulse">
      {/* Header */}
      <div className="h-6 bg-gray-200 rounded w-2/3 mb-6"></div>

      {/* Subheader */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

      {/* Image Placeholder */}
      <div className="h-48 bg-gray-200 rounded w-full mb-6"></div>

      {/* Paragraphs */}
      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>

      {/* Button Placeholder */}
      <div className="h-10 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
}
