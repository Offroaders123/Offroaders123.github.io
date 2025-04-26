import { writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

/** @type {[string, string][]} */
import imagePaths from "./art-paths.json" with { type: "json" };

/** @type {[string, Uint8Array][]} */
const imageBinaries = await Promise.all(
  imagePaths.map(
    /** @returns {Promise<[string, Uint8Array]>} */
    async ([name, path]) => [`${name}${extname(path)}`, new Uint8Array(await (await fetch(path)).arrayBuffer())]
  )
);
console.log(imageBinaries);

for (const [path, data] of imageBinaries) {
  writeFile(join(import.meta.dirname, "..", "public", path), data);
}
