const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
    <div className="relative flex items-center justify-center">
      {/* Rotating Divided Blue Circle */}
      <div className="w-28 h-28 border-4 border-primary-dark border-t-transparent border-solid rounded-full animate-spin"></div>

      {/* Loading Text */}
      <div className="absolute text-white text-lg font-semibold animate-pulse">
        Loading...
      </div>
    </div>
  </div>
);

export default PageLoader;
