import Link from "next/link";

export default function Anime({ title, imageURL, id }) {
  return (
    <div>
      <h1 className="text-center p-2">{title}</h1>
      <Link href={`/${id}`}>
        <img src={imageURL} alt={title} className="w-full" />
      </Link>
    </div>
  );
}
