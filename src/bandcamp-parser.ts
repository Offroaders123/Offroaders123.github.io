// An alternative to `bandcamp.ts`. This one works on getting all metadata overall, rather than just what the homepage provides.
// More will be added. I want to get all song info with this script too.
// It's in an IIFE because this is also meant to be run in DevTools, and it is complex enough to need functions, and
// not worrying about the global scope really helps.

import type * as bandcamp from "./bandcamp.ts";

type Release = bandcamp.Release & {
  path: string;
  artwork: string;
  artwork_web: string;
  tracks: () => Promise<TrAlbum>;
};

interface TrAlbum {
  about: string | null;
  credits: string | null;
  minimum_price: number;
  mod_date: string;
  new_date: string;
  publish_date: string;
  release_date: string;
  upc?: string | null;
  tracksInfo: TrackInfo[];
}

interface TrackInfo {
  duration: number;
  title: string;
  title_link: string;
  track_id: number;
  track_num: number | null;
  lyrics: () => Promise<LyricsInfo>;
}

type LyricsInfo = Pick<bandcamp.TrAlbumData["current"], "about" | "id" | "isrc" | "lyrics" | "minimum_price" | "mod_date" | "new_date" | "publish_date" | "release_date" | "title" | "track_number" | "type">;

(async () => {
  const getInitialValues: () => bandcamp.Release[] = (() => {
    let value: bandcamp.Release[];
    return (): bandcamp.Release[] => {
      if (value === undefined) {
        value = JSON.parse(document.querySelector<HTMLOListElement>("#music-grid")!.dataset["initialValues"]!) as bandcamp.Release[];
      }
      return value;
    };
  })();
  function getMusicGrid(): HTMLOListElement {
    return document.querySelector<HTMLOListElement>("#music-grid:first-child")!;
  }
  function getMusicGridItems(): HTMLLIElement[] {
    return [...getMusicGrid().querySelectorAll<HTMLLIElement>(".music-grid-item")!];
  }
  function getReleases() {
    return getMusicGridItems().map(musicGridItem => getRelease(musicGridItem));
  }
  function getRelease(musicGridItem: HTMLLIElement): Release {
    const path: string = musicGridItem.querySelector<HTMLAnchorElement>(":scope > a")!.href;
    const tracks: () => Promise<TrAlbum> = getTracks(path);
    const artwork_web: string = musicGridItem.querySelector("img")!.src;
    const { type, title, band_name, artist, page_url, publish_date, release_date, id, art_id, band_id }: bandcamp.Release = getInitialValues()
      .find(initialValue => path.endsWith(initialValue.page_url))!;
    const artwork: string = `https://f4.bcbits.com/img/a0${art_id}_0.jpg`;
    return { type, title, band_name, artist, page_url, publish_date, release_date, path, artwork, artwork_web, id, art_id, band_id, tracks };
  }
  function getTracks(path: string): () => Promise<TrAlbum> {
    return async (): Promise<TrAlbum> => {
      const doc: Document = await fetchPage(path);
      const tralbumRef: HTMLScriptElement = doc.querySelector<HTMLScriptElement>("[data-tralbum]")!;
      const { current: { about, credits, minimum_price, mod_date, new_date, publish_date, release_date, upc }, trackinfo }: bandcamp.TrAlbumData = JSON.parse(tralbumRef.dataset["tralbum"]!) as bandcamp.TrAlbumData;
      const tracksInfo: TrackInfo[] = trackinfo.map(({ duration, title, title_link, track_id, track_num }) => ({ duration, title, title_link, track_id, track_num, lyrics: getLyrics(title_link) } satisfies TrackInfo));
      return { about, credits, minimum_price, mod_date, new_date, publish_date, release_date, upc, tracksInfo };
    };
  }
  function getLyrics(path: string): () => Promise<LyricsInfo> {
    return async (): Promise<LyricsInfo> => {
      const doc: Document = await fetchPage(path);
      const tralbumRef: HTMLScriptElement = doc.querySelector<HTMLScriptElement>("[data-tralbum]")!;
      const { current: { about, isrc, lyrics, minimum_price, mod_date, new_date, publish_date, release_date, title, track_number, type }, id }: bandcamp.TrAlbumData = JSON.parse(tralbumRef.dataset["tralbum"]!) as bandcamp.TrAlbumData;
      return { about, id, isrc, lyrics, minimum_price, mod_date, new_date, publish_date, release_date, title, track_number, type };
    };
  }
  async function fetchPage(path: string): Promise<Document> {
    const parser: DOMParser = new DOMParser();
    const response: Response = await fetch(path);
    const text: string = await response.text();
    return parser.parseFromString(text, "text/html");
  }

  const releases: Release[] = getReleases();
  console.log(releases);

  const albumsTracks: TrAlbum[] = await Promise.all(releases.map(release => release.tracks()));
  console.log(albumsTracks);

  const lyricsInfos: LyricsInfo[][] = [];

  for (const album of albumsTracks) {
    await new Promise(resolve => setTimeout(resolve, 20000));
    const lyricsInfo: LyricsInfo[] = await Promise.all(album.tracksInfo.map(trackInfo => trackInfo.lyrics()));
    console.log(lyricsInfo);
    lyricsInfos.push(lyricsInfo);
  }

  const result = { releases, albumsTracks, lyricsInfos };
  console.log(result);
  return result;
})();
