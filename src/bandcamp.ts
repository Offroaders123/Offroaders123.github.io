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
  // private: unknown;
  // subscriber_only: unknown;
  publish_date: string;
  release_date: string;
  page_url: string;
  art_id: number;
  artist: string | null;
  band_id: number;
  band_name: string;
  // invited_item: boolean;
  // pending_transfer: unknown;
  // filtered: unknown;
  // hidden_band: unknown;
  // featured_date: unknown;
  // is_purchasable: boolean;
  // has_audio: unknown;
  // hidden_license: unknown;
  // licenses: unknown[];
}

export interface TrAlbum {
  about: string | null;
  credits: string | null;
  minimum_price: number;
  mod_date: string;
  new_date: string;
  publish_date: string;
  release_date: string;
  upc?: string | null;
  tracksInfo: TrackInfo[];
}

export interface TrackInfo {
  duration: number;
  title: string;
  title_link: string;
  track_id: number;
  track_num: number | null;
}
