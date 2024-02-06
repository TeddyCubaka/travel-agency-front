import { create } from "zustand";
import { Op_agent } from "../interfaces";

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
  agent?: Op_agent;

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
  ID: 1,
  is_connect: false,
  is_activate: false,
  created_at: new Date().toLocaleDateString(),
  updated_at: new Date().toLocaleDateString(),
  agent: {
    agent_ID: 1,
    stt_tag: "catc2107-3c02-4c3d-8251-06508b1fd59494",
    first_name: "Teddy",
    second_name: "Cubaka",
    birth_date: "07/09/1997",
    hired_date: "10/12/2024",
    fired_date: "",
    address: "Ngaliema / joli-parc",
    city: "Kinshasa",
    country: "RD Congo",
    sexe: "M",
    phone_number: "900 000 000",
    mail: "ted@woubou.com",
    salary: "800 USD",
    direction_ID: 1,
    service_rh_ID: 2,
    created_at: "10/12/2023",
    updated_at: "10/12/2023",
    Id_user_create_at: 1,
  },

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
