import type { ReleaseProps } from "./Release.tsx";
import "./Elapsed.css";
import { secondsToDuration } from "./TrackList.tsx";

export function Elapsed(props: ReleaseProps) {
  return (
    <p
      class="Elapsed">
      {props.tracksInfo.length} track{props.tracksInfo.length !== 1 ? "s" : ""}, {secondsToDuration(albumDuration(props))} length
    </p>
  );
}

function albumDuration(release: ReleaseProps): number {
  return release.tracksInfo.reduce(
    (previous, info) => info.duration + previous,
    0
  );
}
