// An alternative to `bandcamp.ts`. This one works on getting all metadata overall, rather than just what the homepage provides.
// More will be added. I want to get all song info with this script too.
// It's in an IIFE because this is also meant to be run in DevTools, and it is complex enough to need functions, and
// not worrying about the global scope really helps.

(async () => {
  const getInitialValues = (() => {
    let value;
    return () => {
      if (value === undefined) {
        value = JSON.parse(document.querySelector("#music-grid").dataset.initialValues);
      }
      return value;
    };
  })();
  function getMusicGrid() {
    return document.querySelector("#music-grid:first-child");
  }
  function getMusicGridItems() {
    return getMusicGrid().querySelectorAll(".music-grid-item");
  }
  function getReleases() {
    return [...getMusicGridItems()].map(musicGridItem => getRelease(musicGridItem));
  }
  function getRelease(musicGridItem) {
    const path = musicGridItem.querySelector(":scope > a").href;
    const tracks = getTracks(path);
    const artwork_web = musicGridItem.querySelector("img").src;
    const { type, title, band_name, artist, page_url, publish_date, release_date, id, art_id, band_id } = getInitialValues()
      .find(initialValue => path.endsWith(initialValue.page_url));
    const artwork = `https://f4.bcbits.com/img/a0${art_id}_0.jpg`;
    return { type, title, band_name, artist, page_url, publish_date, release_date, path, artwork, artwork_web, id, art_id, band_id, tracks };
  }
  function getTracks(path) {
    return async () => {
      const doc = await fetchPage(path);
      const tralbumRef = doc.querySelector("[data-tralbum]");
      const { current: { about, credits, minimum_price, mod_date, new_date, publish_date, release_date, upc }, trackinfo } = JSON.parse(tralbumRef.dataset.tralbum);
      const tracksInfo = trackinfo.map(({ duration, title, title_link, track_id, track_num }) => ({ duration, title, title_link, track_id, track_num, lyrics: getLyrics(title_link) }));
      return { about, credits, minimum_price, mod_date, new_date, publish_date, release_date, upc, tracksInfo };
    };
  }
  function getLyrics(path) {
    return async () => {
      const doc = await fetchPage(path);
      const tralbumRef = doc.querySelector("[data-tralbum]");
      const { id, isrc, lyrics, minimum_price, mod_date, new_date, publish_date, title, track_number } = JSON.parse(tralbumRef.dataset.tralbum);
      return { id, isrc, lyrics, minimum_price, mod_date, new_date, publish_date, title, track_number };
    };
  }
  async function fetchPage(path) {
    const parser = new DOMParser();
    const response = await fetch(path);
    const text = await response.text();
    return parser.parseFromString(text, "text/html");
  }

  const releases = getReleases();
  console.log(releases);

  const albumsTracks = await Promise.all(releases.map(release => release.tracks()));
  console.log(albumsTracks);

  for (const album of albumsTracks) {
    const lyricsInfo = await Promise.all(album.tracksInfo.map(trackInfo => trackInfo.lyrics()));
    console.log(lyricsInfo);
  }
})();
