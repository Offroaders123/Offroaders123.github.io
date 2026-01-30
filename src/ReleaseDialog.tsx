import { type Accessor, createEffect, type Setter, Show } from "solid-js";
import type { ReleaseProps } from "./Release.tsx";
import { TrackList } from "./TrackList.tsx";
import "./ReleaseDialog.css";

export interface ReleaseDialogProps extends ReleaseProps {
  showDialog: Accessor<boolean>;
  setShowDialog: Setter<boolean>;
  imgSrc: string;
};

export default function ReleaseDialog(props: ReleaseDialogProps) {
  let dialog: HTMLDialogElement;

  createEffect(() => {
    if (props.showDialog()) {
      dialog!.showModal();
    }
  });

  return (
    <dialog
      class="Release-Dialog"
      ref={dialog!}
      onclose={() => props.setShowDialog(false)}>
      <form method="dialog">
        <img
          width={350}
          height={350}
          src={props.imgSrc}
          alt={props.title}
          loading="lazy"
        />
        <p><a href={`https://rbnaodn.bandcamp.com${props.page_url}`}>{props.title}</a></p>
        <Show when={props.type === "album"}>
          <TrackList {...props} />
        </Show>
        <pre>{props.about}</pre>
        <button type="submit">Close</button>
      </form>
    </dialog>
  );
}
