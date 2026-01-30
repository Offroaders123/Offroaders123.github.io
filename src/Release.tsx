import { createSignal, type Signal } from "solid-js";
import type { Release } from "./discography.ts";
import ReleaseDialog from "./ReleaseDialog.tsx";
import "./Release.css";

export interface ReleaseProps extends Pick<Release, "title" | "about" | "page_url" | "tracksInfo"> { }

export default function Release(props: ReleaseProps) {
  const [showDialog, setShowDialog]: Signal<boolean> = createSignal<boolean>(false);

  const imgSrc: string = `/${props.page_url.split("/").at(-1)}.jpg`;

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
      <ReleaseDialog
        {...props}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        imgSrc={imgSrc}
      />
    </>
  );
}
