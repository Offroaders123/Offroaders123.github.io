import { createResource, For, type ResourceReturn } from "solid-js";
import discographyDataPath from "/discography.json?url";
import Release from "./Release.tsx";
import "./Discography.css";

type DiscographyData = typeof import("../public/discography.json");

export default function Discography() {
  const [discographyData]: ResourceReturn<DiscographyData, unknown> = createResource(async () => {
    const response: Response = await fetch(discographyDataPath);
    return await response.json() as DiscographyData;
  });

  return (
    <div class="Discography">
      <For each={discographyData()?.releases}>
        {(release, i) => (
          <Release
            {...release}
            description={discographyData()?.albumsTracks[i()]!.about}
          />
        )}
      </For>
    </div>
  );
}
