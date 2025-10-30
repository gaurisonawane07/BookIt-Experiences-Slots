export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-100 rounded w-1/2"></div>
        <div className="h-4 bg-gray-100 rounded w-1/3"></div>
      </div>
    </div>
  );
}
