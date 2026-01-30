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
 * an MM:SS or HH:MM:SS string as applicable.
 */
export function secondsToDuration(span: number): string {
  span = Math.round(span);
  const hours: number = span / 3600 | 0;
  const minutes: number = (span % 3600) / 60 | 0;
  const seconds: number = span % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
