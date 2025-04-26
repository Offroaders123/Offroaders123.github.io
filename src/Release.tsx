import type { MusicLike } from "./bandcamp.ts";

export interface ReleaseProps extends Pick<MusicLike, "title" | "publish_date" | "release_date" | "page_url"> {}

export default function Release(props: ReleaseProps) {
  return (
    <div>
      <img
        width={168}
        height={168}
        src={`/${props.page_url.split("/").at(-1)}.jpg`}
        loading="lazy"
      />
      <p>{props.title}</p>
    </div>
  );
}
