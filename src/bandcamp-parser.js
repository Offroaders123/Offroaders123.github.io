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
    const artwork_web = musicGridItem.querySelector("img").src;
    const { type, title, band_name, artist, page_url, publish_date, release_date, id, art_id, band_id } = getInitialValues()
      .find(initialValue => path.endsWith(initialValue.page_url));
    const artwork = `https://f4.bcbits.com/img/a0${art_id}_0.jpg`;
    return { type, title, band_name, artist, page_url, publish_date, release_date, path, artwork, artwork_web, id, art_id, band_id };
  }

  const releases = getReleases();
  console.log(releases);
})();
