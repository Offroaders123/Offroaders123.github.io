import Discography from "./Discography.tsx";
import Starter from "./Starter.tsx";

export default function Main() {
  return (
    <>
      <h4>Hello world! 👋</h4>
      <p>Hey there! My name is Brandon Bennett.</p>

      <details>
        <summary>More About Me</summary>
        <Starter/>
      </details>

      <p>I am proud of myself, so I am going to show you who I am!</p>

      <Discography/>
    </>
  );
}
