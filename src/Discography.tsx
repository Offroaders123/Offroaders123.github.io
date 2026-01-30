import { createResource, For, type ResourceReturn } from "solid-js";
import discographyDataPath from "/discography.json?url";
import Release from "./Release.tsx";
import type { Release as DiscographyRelease } from "./discography.ts";
import "./Discography.css";

type DiscographyData = DiscographyRelease[];

export default function Discography() {
  const [discographyData]: ResourceReturn<DiscographyData, unknown> = createResource(async () => {
    const response: Response = await fetch(discographyDataPath);
    return await response.json() as DiscographyData;
  });

  return (
    <div class="Discography">
      <For each={discographyData()}>
        {release => <Release {...release} />}
      </For>
    </div>
  );
}
