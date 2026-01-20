// Use my bandcamp-fetcher project to fetch release publish dates and descriptions.
// It is currently saved in a JSON file over in /public.

export interface Release {
  name: string;
  dateReleased: string;
  description?: string;
}
