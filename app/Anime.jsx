import Link from "next/link";
import { useState, useEffect } from "react";

export default function Anime({ title, imageURL, id }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imageURL;
    img.onload = () => setIsImageLoading(false);
  }, [imageURL]);

  return (
    <div className="overflow-hidden rounded-lg">
      <h1 className="text-center p-2">{title}</h1>
      <Link href={`/${id}`}>
        {isImageLoading && (
          <img
            src="/loading-spinner.gif" // Placeholder image or spinner
            alt="Loading..."
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
        {!isImageLoading && (
          <img
            src={imageURL}
            alt={title}
            className="w-full h-96 object-cover rounded-lg transition-opacity duration-500"
          />
        )}
      </Link>
    </div>
  );
}
