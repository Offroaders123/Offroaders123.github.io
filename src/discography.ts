// These are the types for the consolidated version of `discography.json`.
// I made them by assigning the contents of the file to a variable, then assigning
// type declarations to the type until it no longer had type errors.

export type Release = AlbumRelease | TrackRelease;

export interface AlbumRelease extends ReleaseLike {
  type: "album";
}

export interface TrackRelease extends ReleaseLike {
  type: "track";
}

export interface ReleaseLike {
  title: string;
  band_name: string;
  artist: string | null;
  page_url: string;
  publish_date: string;
  release_date: string;
  path: string;
  artwork: string;
  artwork_web: string;
  id: number;
  art_id: number;
  band_id: number;
  about: string | null;
  credits: string | null;
  minimum_price: number;
  mod_date: string;
  new_date: string;
  upc?: string | null;
  tracksInfo: Track[];
}

export interface Track {
  duration: number;
  title: string;
  title_link: string;
  track_id: number;
  track_num: number | null;
  about: string | null;
  id: number;
  isrc: string | null;
  lyrics: string | null;
  minimum_price: number;
  mod_date: string;
  new_date: string;
  publish_date: string;
  release_date: string | null;
  track_number: number | null;
  type: "track";
}
