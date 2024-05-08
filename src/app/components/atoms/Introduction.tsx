export default function Introduction() {
  return (
    <div className="row">
      <b>
        This project uses OpenAI&apos;s APIs to recreate famous paintings
        through an <i>image-to-text-to-image</i> process.
      </b>
      <br />
      The goal is to evaluate how well AI can analyze and recreate paintings
      without explicitly naming the original title or artist.
      <br />
      By providing an image of a famous painting (e.g., the Mona Lisa),
      OpenAI&apos;s APIs generate a detailed description of the artwork,
      including the objects and colors depicted.
      <br />
      Using this description, the project then prompts the OpenAI APIs to
      produce a new, original painting.
      <br />
      <u>
        The title and artist of the original masterpiece are intentionally
        omitted.
      </u>
    </div>
  );
}
