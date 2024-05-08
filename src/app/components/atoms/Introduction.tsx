export default function Introduction() {
  return (
    <div className="row">
      <b>
        This project utilizes OpenAI&apos;s APIs to create unique pieces of art.
      </b>
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
      <br />
      This experiment aims to evaluate the AI&apos;s ability to analyze and
      recreate an image (<i>image-to-text-to-image</i>).
    </div>
  );
}
