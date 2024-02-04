export default async function AnimeDetails({ params }) {
  const { anime } = params;
  const data = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
  const res = await data.json();
  if (!res) {
    return <p>Loading...</p>;
  }

  function getProperty(color, property, value) {
    return (
      <p>
        <span className={`${color} underline underline-offset-auto`}>
          {property}:
        </span>
        {" " + value}
      </p>
    );
  }

  return (
    <div className="flex w-screen">
      <div className="flex w-2/5 flex-col">
        <h1 className="pb-4 text-center text-2xl font-bold">
          {res.data.title}
        </h1>
        <div className="flex justify-center">
          <img
            src={res.data.images.jpg.large_image_url}
            alt={res.data.title}
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className="w-3/5 pt-10">
        <p className="pr-48 text-justify">
          <span className="text-rose-600 underline underline-offset-auto">
            Summary:
          </span>
          {" " + res.data.synopsis}
        </p>
        <p>
          <span className="text-orange-400 underline underline-offset-auto">
            Genre(s):
          </span>
          {res.data.genres.map((genre) => (
            <span>{" " + genre.name}</span>
          ))}
        </p>
        {getProperty("text-yellow-300", "Episode(s)", res.data.episodes)}
        {getProperty("text-green-300", "Duration", res.data.duration)}
        {getProperty("text-green-600", "Status", res.data.status)}
        {getProperty("text-blue-300", "Score", res.data.score)}
        {getProperty("text-blue-600", "Rank", res.data.rank)}
        {getProperty("text-indigo-600", "Source", res.data.source)}
        {getProperty("text-purple-400", "Rating", res.data.rating)}
      </div>
    </div>
  );
}
