/** @type {typeof import("jszip")} */
const { default: JSZip } = await import("https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm");

/** @type {HTMLImageElement[]} */
const musicGridItemImages = [...document.querySelectorAll("#music-grid .music-grid-item img")];

/** @type {string[]} */
const imagePaths = musicGridItemImages.map(img => img.src);

/** @type {[string, Blob][]} */
const imageBinaries = await Promise.all(
  imagePaths.map(
    /** @returns {Promise<[string, Blob]>} */
    async path => [path, (await fetch(path)).blob()]
  )
);

const zip = new JSZip();

for (const [path, blob] of imageBinaries) {
  zip.file(path, blob);
}

/** @type {Blob} */
const zipBlob = await zip.generateAsync({ type: "blob" });
