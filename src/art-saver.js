import { basename } from "node:path";
/** @type {string[]} */
import imagePaths from "./art-paths.json" with { type: "json" };

/** @type {[string, Blob][]} */
const imageBinaries = await Promise.all(
  imagePaths.map(
    /** @returns {Promise<[string, Blob]>} */
    async path => [basename(path), await (await fetch(path)).blob()]
  )
);
console.log(imageBinaries);
