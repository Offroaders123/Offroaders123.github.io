import discographyData from "../public/discography.json" with { type: "json" };

type DiscographyData = typeof discographyData;

type Release = DiscographyData["releases"][number];

type AlbumTracks = DiscographyData["albumsTracks"][number];

type LyricsInfo = DiscographyData["lyricsInfos"][number][number];

const consolidated = discographyData.releases.map((release: Release, i: number) => {
  const albumTracks: AlbumTracks = discographyData.albumsTracks[i]!;
  const lyricsInfos: LyricsInfo[] = discographyData.lyricsInfos[i]!;
  return {
    ...release,
    ...{
      ...albumTracks,
      tracks: lyricsInfos
    }
  };
});

console.log(consolidated);
