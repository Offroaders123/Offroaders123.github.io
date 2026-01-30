import { For } from "solid-js";
import type { ReleaseProps } from "./Release.tsx";
import "./TrackList.css";

export function TrackList(props: ReleaseProps) {
  return (
    <div class="Track-List">
      <For each={props.tracksInfo}>
        {info =>
          <p
            data-track-number={
              info.track_number!
                .toString()
                .padStart(2, "0")
            }>
            {info.title}
          </p>
        }
      </For>
    </div>
  );
}
