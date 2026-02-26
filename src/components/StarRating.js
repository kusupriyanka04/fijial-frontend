export default function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1 mt-2">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <span key={i} className="text-yellow-400">★</span>;
        } else if (i === fullStars && halfStar) {
          return <span key={i} className="text-yellow-400" style={{opacity: 0.5}}>☆</span>;
        } else {
          return <span key={i} className="text-gray-300">★</span>;
        }
      })}
      <span className="text-sm text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

