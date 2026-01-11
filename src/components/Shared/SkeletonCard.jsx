const SkeletonCard = () => {
  return (
    <div className="card-uniform overflow-hidden">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-base-300 skeleton-animate" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 bg-base-300 rounded-lg w-3/4 skeleton-animate" />
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-base-300 rounded w-full skeleton-animate" />
          <div className="h-4 bg-base-300 rounded w-5/6 skeleton-animate" />
        </div>
        
        {/* Meta Info */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-20 bg-base-300 rounded-full skeleton-animate" />
          <div className="h-6 w-16 bg-base-300 rounded-full skeleton-animate" />
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-base-300">
          <div className="h-8 w-24 bg-base-300 rounded skeleton-animate" />
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-base-300 rounded-full skeleton-animate" />
            <div className="h-8 w-8 bg-base-300 rounded-full skeleton-animate" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="card-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonCard;
