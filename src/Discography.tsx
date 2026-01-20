import { createResource, For, type ResourceReturn } from "solid-js";
import bandcampDataPath from "/bandcamp-data.json?url";
import releaseDataPath from "/release-data.json?url";
import type { Release as BandcampRelease } from "./bandcamp.ts";
import type { Release as ReleaseInfo } from "./release.ts";
import Release from "./Release.tsx";
import "./Discography.css";

export default function Discography() {
  const [bandcampData]: ResourceReturn<BandcampRelease[], unknown> = createResource(async () => {
    const response: Response = await fetch(bandcampDataPath);
    return await response.json() as BandcampRelease[];
  });
  const [releaseData]: ResourceReturn<ReleaseInfo[], unknown> = createResource(async () => {
    const response: Response = await fetch(releaseDataPath);
    return await response.json() as ReleaseInfo[];
  });

  return (
    <div class="Discography">
      <For each={bandcampData()}>
        {release => (
          <Release
            {...release}
            description={releaseData()?.find(data => data.name === release.title)?.description}
          />
        )}
      </For>
    </div>
  );
}
