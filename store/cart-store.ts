import { create } from "zustand";
import { persist } from "zustand/middleware";

//typescript types
export interface CartItem {
  // will defined attributes of cart
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

//defined how store will look like what we will manage
interface CartStore {
  items: CartItem[];
  // add items to list
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

//using zustand
export const useCartStore = create<CartStore>()(
  // persist will help items remain in localStorage
  persist(
    // with the set we get access to the state
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          //check if item exist if it does  loop throgh item and retunr new value/quantity (cobitantion of two quantities )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          //if not exist add to list
          return { items: [...state.items, item] };
        }),

      removeItem: (id) =>
        set((state) => {
          return {
            items: state.items
              //filter thoiugh list of items and decreate qty by 1
              .map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
              )
              //if is less than 0 remove
              .filter((item) => item.quantity > 0),
          };
        }),
      //return object with empty array
      clearCart: () =>
        set(() => {
          return { items: [] };
        }),
    }),
    { name: "cart" }
  )
);
