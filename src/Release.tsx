import { createEffect, createSignal, type Signal } from "solid-js";
import type { Release } from "./discography.ts";
import "./Release.css";

export type ReleaseProps = Pick<Release, "title" | "about" | "page_url">;

export default function Release(props: ReleaseProps) {
  let dialog: HTMLDialogElement;
  const [showDialog, setShowDialog]: Signal<boolean> = createSignal<boolean>(false);

  const imgSrc: string = `/${props.page_url.split("/").at(-1)}.jpg`;

  createEffect(() => {
    if (showDialog()) {
      dialog!.showModal();
    }
  });

  return (
    <>
      <button
        class="Release"
        onclick={() => setShowDialog(true)}>
        <img
          width={168}
          height={168}
          src={imgSrc}
          alt={props.title}
          loading="lazy"
        />
        <p>{props.title}</p>
      </button>
      <dialog
        class="Release-Dialog"
        ref={dialog!}
        onclose={() => setShowDialog(false)}>
        <form method="dialog">
          <img
            width={350}
            height={350}
            src={imgSrc}
            alt={props.title}
            loading="lazy"
          />
          <p><a href={`https://rbnaodn.bandcamp.com${props.page_url}`}>{props.title}</a></p>
          <pre>{props.about}</pre>
          <button type="submit">Close</button>
        </form>
      </dialog>
    </>
  );
}
