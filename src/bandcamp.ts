// Gathered from the DOM contents on `https://rbnaodn.bandcamp.com/`, it's just available as a big JSON string in a data attribute! Outstanding!!
// JSON.stringify(JSON.parse(document.querySelector("#music-grid").dataset.initialValues), null, 2);

export type Release = Album | Track;

export interface Album extends MusicLike {
  type: "album";
}

export interface Track extends MusicLike {
  type: "track";
}

export interface MusicLike {
  id: number;
  title: string;
  private: unknown;
  subscriber_only: unknown;
  publish_date: string;
  release_date: string;
  page_url: string;
  art_id: number;
  artist: unknown;
  band_id: number;
  band_name: string;
  invited_item: boolean;
  pending_transfer: unknown;
  filtered: unknown;
  hidden_band: unknown;
  featured_date: unknown;
  is_purchasable: unknown;
  has_audio: unknown;
  hidden_license: unknown;
  licenses: unknown[];
}
