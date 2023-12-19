import { create } from "zustand";
import { Op_product, Rf_category, Rf_partner } from "../interfaces";

interface Service {
  products: Op_product[];
  categories: Rf_category[];
  partners: Rf_partner[];

  add_product: (product: Op_product) => void;
  add_catogorie: (category: Rf_category) => void;
  add_partners: (category: Rf_partner) => void;
}

const service_store = create<Service>()((set) => ({
  products: [],
  categories: [],
  partners: [],
  add_product: (value) =>
    set((store) => ({ ...store, products: [...store.products, value] })),
  add_catogorie: (value) =>
    set((store) => ({ ...store, categories: [...store.categories, value] })),
  add_partners: (value) =>
    set((store) => ({ ...store, partners: [...store.partners, value] })),
}));

export default service_store;
