export interface Pizza {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    category: number;
    sizes: number[];
  }
  
export type Category = {
    id: string
    name: string
}