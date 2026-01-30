import discographyData from "../public/discography-old.json" with { type: "json" };

type DiscographyData = typeof discographyData;

type Release = DiscographyData["releases"][number];

type AlbumTracks = DiscographyData["albumsTracks"][number];

type LyricsInfo = DiscographyData["lyricsInfos"][number][number];

// `consolidated` is valid against the type `Release[]` from `discography.ts`.
// It merely doesn't pass because `type` is `string` vs `"album" | "track"`.
// Moving to solid types will help mitigate this.
// This can probably be a general function inside of `bandcamp-parser`, now
// that everything is fully type-safe both directions.
// I tested everything against the old `discography-old.json` file (non-consolidated).
const consolidated = discographyData.releases.map((release: Release, i: number) => {
  const albumTracks: AlbumTracks = discographyData.albumsTracks[i]!;
  const lyricsInfos: LyricsInfo[] = discographyData.lyricsInfos[i]!;
  return {
    ...release,
    ...albumTracks,
    tracksInfo: albumTracks.tracksInfo.map((info, i) => ({ ...info, ...lyricsInfos[i]! }))
  };
});

console.dir(consolidated, { depth: null });
