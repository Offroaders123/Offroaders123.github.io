import type { LyricsInfo, ParserResult, Release as ParserRelease, TrAlbum, TrackInfo } from "./bandcamp-parser.ts";
import type { Release } from "./discography.ts";

declare const discographyData: ParserResult;

// `consolidated` is valid against the type `Release[]` from `discography.ts`.
// It merely doesn't pass because `type` is `string` vs `"album" | "track"`.
// Moving to solid types will help mitigate this.
// This can probably be a general function inside of `bandcamp-parser`, now
// that everything is fully type-safe both directions.
// I tested everything against the old `discography-old.json` file (non-consolidated).
const consolidated: Release[] = discographyData.releases.map((release: ParserRelease, i: number) => {
  const albumTracks: TrAlbum = discographyData.albumsTracks[i]!;
  const lyricsInfos: LyricsInfo[] = discographyData.lyricsInfos[i]!;
  return {
    ...release,
    ...albumTracks,
    tracksInfo: albumTracks.tracksInfo.map(({ lyrics: _lyrics, ...info }: TrackInfo, i: number) => ({ ...info, ...lyricsInfos[i]! }))
  };
});

console.dir(consolidated, { depth: null });
