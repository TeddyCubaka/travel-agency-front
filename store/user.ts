import { create } from "zustand";

interface User {
  ID?: number;
  login: string;
  pwd: string;
  is_connect?: boolean;
  is_activate?: boolean;
  created_at?: string;
  updated_at?: string;
}

export let default_user: User = {
  ID: 1,
  login: '995867384',
  pwd: 'admin',
  is_connect: true,
  is_activate: true
}

export interface Sys_user {
  ID?: number;
  login: string;
  pwd: string;
  is_connect?: boolean;
  is_activate?: boolean;
  created_at?: string;
  updated_at?: string;

  set_ID?: (value: number) => void;
  set_login?: (value: string) => void;
  set_pwd?: (value: string) => void;
  set_is_connect?: (value: boolean) => void;
  set_is_activate?: (value: boolean) => void;
  set_created_at?: (value: string) => void;
  set_updated_at?: (value: string) => void;
  hydrate: () => void;
}

const sys_user_store = create<Sys_user>()((set) => ({
  login: "",
  pwd: "",
  user: null,
  set_login: (login) => set((state) => ({ login: login })),
  set_pwd: (pwd) => set((state) => ({ pwd: pwd })),
  hydrate: () =>
    set((state) => ({
      ...state,
      ID: 1,
      login: state.login,
      pwd: state.pwd,
      is_connect: true,
      is_activate: true,
      created_at: new Date().toLocaleDateString(),
      updated_at: new Date().toLocaleDateString(),
    }))
}));

export default sys_user_store;
