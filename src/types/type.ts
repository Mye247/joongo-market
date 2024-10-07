export type deals = {
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

export type deal = {
  id: number;
  authorId: string;
  title: string;
  content: string;
  location: string;
  price: number;
};

