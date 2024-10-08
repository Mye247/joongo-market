export type Deals = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map?: any;
  id: number;
  authorId: string;
  title: string;
  content: string;
  location: string;
  price: number;
  imageUrl: string;
};

export type Deal = {
  id: number;
  authorId: string;
  title: string;
  content: string;
  location: string;
  price: number;
};

export const BaseUrl =
  "https://frghixucjmwdoiizjraf.supabase.co/storage/v1/object/public/deals/";
