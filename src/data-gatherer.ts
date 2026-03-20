import data from "./public/discography.json" with { type: "json" };
import type { Release } from "./src/discography.ts";

const discographyData: Release[] = data as Release[];
// console.log(discographyData);

const gathered = discographyData.map(({ release_date, type, title, tracksInfo }) =>
  ({
    release_date,
    type,
    title,
    tracks: tracksInfo.length,
    duration: secondsToDuration(albumDuration(tracksInfo))
  })
);
// console.log(gathered);
console.log(JSON.stringify(gathered, null, 2));

function albumDuration(tracksInfo: Release["tracksInfo"]): number {
  return tracksInfo.reduce(
    (previous, info) => info.duration + previous,
    0
  );
}

/**
 * Converts from a number derived of seconds, into
 * an MM:SS or HH:MM:SS string as applicable.
 */
function secondsToDuration(span: number): string {
  span = Math.round(span);
  const hours: number = span / 3600 | 0;
  const minutes: number = (span % 3600) / 60 | 0;
  const seconds: number = span % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
