import { createResource, For, type ResourceReturn } from "solid-js";
import bandcampDataPath from "/bandcamp-data.json?url";
import type { Release as BandcampRelease } from "./bandcamp.ts";
import Release from "./Release.tsx";

export default function Discography() {
  const [bandcampData]: ResourceReturn<BandcampRelease[], unknown> = createResource(async () => {
    const response: Response = await fetch(bandcampDataPath);
    return await response.json() as BandcampRelease[];
  });

  return (
    <div>
      <For each={bandcampData()}>
        {release => (
          <Release
            {...release}
          />
        )}
      </For>
    </div>
  );
}
