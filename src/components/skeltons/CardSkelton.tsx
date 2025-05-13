type CardSkeltonProps = {
  minWidth?: string;
};
export default function CardSkelton({
  minWidth = "min-w-96",
}: CardSkeltonProps) {
  return (
    <div
      className={`bg-light-surface rounded-2xl ring-1 ring-light-base p-5 w-full md:w-fit animate-pulse ${minWidth}`}
    >
      <div className="h-4 bg-gray-200  rounded w-1/3 mb-4"></div>
      <div className="h-8 bg-gray-200  rounded w-1/4 mb-6"></div>
      <div className="h-4 bg-gray-200  rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200  rounded w-full mb-4"></div>
      <div className="h-4 bg-gray-200  rounded w-3/4 mb-4"></div>
    </div>
  );
}
