export type Deals = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map?: any;
  authorId: string;
  content: string;
  createdAt: string;
  id: number;
  imageUrl: string;
  location: string;
  price: number;
  title: string;
};

export type Deal = {
  authorId: string;
  content: string;
  createdAt?: string;
  id: number;
  imageUrl: string;
  location: string;
  price: number;
  title: string;
};

export const BaseUrl =
  "https://frghixucjmwdoiizjraf.supabase.co/storage/v1/object/public/";

{
}
