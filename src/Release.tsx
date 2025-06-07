import type { MusicLike } from "./bandcamp.ts";

export interface ReleaseProps extends Pick<MusicLike, "title" | "publish_date" | "release_date" | "page_url"> { }

export default function Release(props: ReleaseProps) {
  return (
    <div>
      <img
        width={168}
        height={168}
        src={`/${props.page_url.split("/").at(-1)}.jpg`}
        alt={props.title}
        loading="lazy"
      />
      <p><a href={`https://rbnaodn.bandcamp.com${props.page_url}`}>{props.title}</a></p>
    </div>
  );
}
