import type { MusicLike } from "./bandcamp.ts";

export interface ReleaseProps extends Pick<MusicLike, "title" | "publish_date" | "release_date" | "page_url"> {}

export default function Release(props: ReleaseProps) {
  return (
    <div>
      <img
        width={168}
        src={`/${props.title}.jpg`}
        loading="lazy"
      />
      <p>{props.title}</p>
    </div>
  );
}
