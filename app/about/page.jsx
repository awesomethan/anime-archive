export default function About() {
  return (
    <div className="pt-40 flex justify-around px-4 text-lg leading-8">
      <div className="w-1/2">
        <p className="py-5">
          Hey! Welcome to my anime site! Here's how you can use it:
        </p>
        <ul>
          <li>
            You can search for any anime and click on the image to learn more
            about it! The name, genre(s), number of episodes, and many other
            attributes of the anime are listed.
          </li>
          <li>
            If you click 'Search!' without any prompt, a collection of random
            anime will pop up.
          </li>
          <li>
            For inspiration, you can check out the 'Recommended Anime' section.
          </li>
        </ul>
        <p className="py-5">Have fun learning more about anime!</p>
      </div>
      <img
        src="/chisato.gif"
        className="w-1/4 object-contain"
        alt="gif cannot be displayed"
      />
    </div>
  );
}
