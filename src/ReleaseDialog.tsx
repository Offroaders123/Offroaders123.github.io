import { type Accessor, createEffect, type Setter } from "solid-js";
import { Elapsed } from "./Elapsed.tsx";
import type { ReleaseProps } from "./Release.tsx";
import { TrackList } from "./TrackList.tsx";
import "./ReleaseDialog.css";

export type ReleaseDialogProps = ReleaseProps & {
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
        <h2>{props.artist ?? props.band_name}</h2>
        <h3><a href={`https://rbnaodn.bandcamp.com${props.page_url}`}>{props.title}</a></h3>
        <Elapsed {...props} />
        <TrackList {...props} />
        <pre>{props.about}</pre>
        <button type="submit">Close</button>
      </form>
    </dialog>
  );
}
