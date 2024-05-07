export default function Introduction() {
  return (
    <div className="row">
      <b>This project uses OpenAI APIs to create art masterpieces.</b>
      <br />
      Given the image of a famous painting (e.g. Mona Lisa), OpenAI APIs return
      the detailed description of the artwork listing all objects and colors
      included in the image.
      <br />
      This description is reused to ask OpenAI APIs to create a new paitining.
      <br />
      <u>The title and the author of the masterpiece are never mentioned.</u>
    </div>
  );
}
