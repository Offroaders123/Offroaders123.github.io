import type { LyricsInfo, ParserResult, Release as ParserRelease, TrAlbum, TrackInfo } from "./bandcamp-parser.ts";
import type { Release, Track } from "./discography.ts";

export function consolidateResult(discographyData: ParserResult): Release[] {
  return discographyData.releases.map((release: ParserRelease, i: number): Release => {
    const albumTracks: TrAlbum = discographyData.albumsTracks[i]!;
    const lyricsInfos: LyricsInfo[] = discographyData.lyricsInfos[i]!;
    return {
      ...release,
      ...albumTracks,
      tracksInfo: albumTracks.tracksInfo
        .map(({ lyrics: _lyrics, ...info }: TrackInfo, i: number): Track =>
          ({ ...info, ...lyricsInfos[i]! })
        )
    };
  });
}
