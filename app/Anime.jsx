import Link from "next/link";

export default function Anime({ title, imageURL, id }) {
  return (
    <div className="overflow-hidden rounded-lg">
      <h1 className="text-center p-2">{title}</h1>
      <Link href={`/${id}`}>
        <img
          src={imageURL}
          alt={title}
          className="w-full h-96 object-cover rounded-lg"
        />
      </Link>
    </div>
  );
}
