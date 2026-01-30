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

export interface TrAlbumData {
  "for the curious": "https://bandcamp.com/help/audio_basics#steal https://bandcamp.com/terms_of_use";
  current: {
    audit: number;
    title: string;
    new_date: string;
    mod_date: string;
    publish_date: string;
    private: null;
    killed: null;
    download_pref: number;
    require_email: null;
    is_set_price: null;
    set_price: number;
    minimum_price: number;
    minimum_price_nonzero: number | null;
    require_email_0: null;
    artist: string | null;
    about: string | null;
    credits: string | null;
    auto_repriced: null;
    new_desc_format: number;
    band_id: number;
    selling_band_id: number;
    art_id: number;
    download_desc_id: null;
    track_number?: number | null;
    release_date: string | null;
    file_name?: null;
    lyrics?: string | null;
    album_id?: null;
    encodings_id?: number;
    pending_encodings_id?: null;
    license_type?: number;
    isrc?: string | null;
    preorder_download?: null;
    streaming?: number;
    upc?: string | null;
    purchase_url?: null;
    purchase_title?: null;
    featured_track_id?: number;
    id: number;
    type: "album" | "track";
  };
  preorder_count: null;
  hasAudio: boolean;
  art_id: number;
  packages: null;
  defaultPrice: number;
  freeDownloadPage: string | null;
  FREE: number;
  PAID: number;
  artist: string;
  item_type: "album" | "track";
  id: number;
  last_subscription_item: boolean;
  has_discounts: boolean;
  is_bonus: null;
  play_cap_data: null;
  is_purchased: boolean;
  items_purchased: {
    packages: Record<string, unknown>;
    bundles: Record<string, unknown>;
    crowdfunding_campaign: Record<string, unknown>;
  };
  is_private_stream: null;
  is_band_member: boolean;
  licensed_version_ids: null;
  package_associated_license_id: null;
  has_video: null;
  tralbum_subscriber_only: boolean | null;
  featured_track_id?: number;
  initial_track_num?: null;
  is_preorder?: boolean;
  album_is_preorder: boolean | null;
  album_release_date: string | null;
  trackinfo: TrackInfo[];
  playing_from: string;
  album_url?: null;
  album_upsell_url?: null;
  url: string;
  use_expando_lyrics?: boolean;
}

export interface TrackInfo {
  id: number;
  track_id: number;
  file: {
    "mp3-128": string;
    "mp3-v0": string;
  };
  artist?: null;
  title: string;
  encodings_id?: number;
  license_type: number;
  private?: null;
  track_num: number | null;
  album_preorder: boolean;
  unreleased_track: boolean;
  title_link: string;
  has_lyrics: boolean;
  has_info: boolean;
  streaming: number;
  is_downloadable: boolean | number;
  has_free_download: boolean | null;
  free_album_download?: boolean;
  duration: number;
  lyrics: string | null;
  sizeof_lyrics: number;
  is_draft: boolean;
  video_source_type?: null;
  video_source_id?: null;
  video_mobile_url?: null;
  video_poster_url?: null;
  video_id?: null;
  video_caption?: null;
  video_featured?: null;
  alt_link?: null;
  encoding_error?: null;
  encoding_pending?: null;
  play_count: number | null;
  is_capped: boolean | null;
  track_license_id?: null;
}
