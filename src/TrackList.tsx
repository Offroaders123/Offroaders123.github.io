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
              (info.track_number ?? 1)
                .toString()
                .padStart(2, "0")
            }>
            {info.title}
            <span
              class="duration">
              {secondsToDuration(info.duration)}
            </span>
          </p>
        }
      </For>
    </div>
  );
}

/**
 * Converts from a number derived of seconds, into
 * an MM:SS string.
 */
function secondsToDuration(span: number): string {
  span = Math.round(span);
  const minutes: number = Math.floor(span / 60);
  const seconds: number = span % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
