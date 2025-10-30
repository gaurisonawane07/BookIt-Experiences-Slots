export interface Slot {
  date: string;
  time: string;
  isBooked: boolean;
}

export interface Experience {
  _id: string;
  title: string;
  location?: string;
  description: string;
  imageUrl: string;
  price: number;
  slots: Slot[];
}
