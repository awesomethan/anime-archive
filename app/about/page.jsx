export const metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="pt-12 xl:pt-20 pb-10 flex justify-around px-4 text-lg leading-8">
      <div className="w-1/2">
        <p className="py-5">
          Welcome to Anime Archive! This platform is designed to help you
          explore, save, and manage your favorite anime.
        </p>
        <ul>
          <li>
            Use the search bar to find any anime by name. Click on the anime
            image to view detailed information, including genres, episodes, and
            ratings.
          </li>
          <li>
            By creating an account, you can add anime to your personal list and
            keep track of your favorites. Access your list at any time and
            easily manage your saved shows.
          </li>
          <li>
            For inspiration, check out the 'Recommended Anime' section for
            curated picks and popular titles.
          </li>
        </ul>
        <p className="py-5">
          Hope you enjoy discovering new anime and managing your personalized
          collection!
        </p>
      </div>
      <img
        src="/chisato.gif"
        className="w-1/4 object-contain"
        alt="Anime character animation"
      />
    </div>
  );
}
