import { create } from "zustand";
import { Op_client } from "../interfaces";
import { generateUUID } from "../utils/functions";

const op_client_store = create<Op_client>()((set) => ({
  ID: 0,
  stt_tag: "",
  first_name: "",
  second_name: "",
  address: "",
  city: "",
  country: "",
  sexe: "",
  phone_number: "",
  mail: "",
  created_at: "",
  updated_at: "",
  Id_user_create_at: 1,

  set_first_name: (value) => set((store) => ({ first_name: value })),
  set_second_name: (value) => set((store) => ({ second_name: value })),
  set_address: (value) => set((store) => ({ address: value })),
  set_city: (value) => set((store) => ({ city: value })),
  set_country: (value) => set((store) => ({ country: value })),
  set_sexe: (value) => set((store) => ({ sexe: value })),
  set_phone_number: (value) => set((store) => ({ phone_number: value })),
  set_mail: (value) => set((store) => ({ mail: value })),
  set_Id_user_create_at: (value) =>
    set((store) => ({ Id_user_create_at: value })),

  create: (client) =>
    set((store) => {
      const new_client = {
        ...store,
        ID: Math.round(Math.random()) * 21,
        stt_tag: generateUUID(),
        first_name: client.first_name,
        second_name: client.second_name,
        address: client.address,
        city: client.city,
        country: client.country,
        sexe: client.sexe,
        phone_number: client.phone_number,
        mail: client.mail,
        created_at: new Date().toLocaleDateString(),
        updated_at: new Date().toLocaleDateString(),
        Id_user_create_at: store.Id_user_create_at,
      };
      client_db.push(new_client);
      return new_client;
    }),
}));

export const client_db: Op_client[] = [
  {
    ID: 1,
    stt_tag: "a58c2107-3c02-4c3d-8251-06508b1fd59494J",
    first_name: "John",
    second_name: "Doe",
    address: "123 Main Street",
    city: "New York",
    country: "USA",
    sexe: "Male",
    phone_number: "(123) 456-7890",
    mail: "john.doe@example.com",
    created_at: "2021-01-01",
    updated_at: "2021-01-02",
    Id_user_create_at: 0,
  },
  {
    ID: 2,
    stt_tag: "a58c2107-3c02-4c3d-8251-06508b1fd0940494",
    first_name: "Jane",
    second_name: "Smith",
    address: "456 Elm Street",
    city: "Los Angeles",
    country: "USA",
    sexe: "Female",
    phone_number: "(987) 654-3210",
    mail: "jane.smith@example.com",
    created_at: "2021-02-01",
    updated_at: "2021-02-02",
    Id_user_create_at: 0
  },
  {
    ID: 21,
    stt_tag: "0ebf58e9-e8ab-4556-bb8c-443153a77d03",
    first_name: "ken",
    second_name: "Hentakyu",
    address: "23 Stritr",
    city: "joijfoiejoi",
    country: "jijfeoijeoi",
    sexe: "joijfaoiejoi",
    phone_number: "joijfeoiajoi",
    mail: "joi",
    created_at: "17/12/2023",
    updated_at: "17/12/2023",
    Id_user_create_at: 0
  },
  {
    ID: 2,
    stt_tag: "a58c2107-3c02-4c3d-8251-06508b1fd52d",
    first_name: "Naruto",
    second_name: "Uzumaki",
    address: "456 Elm Street",
    city: "Los Angeles",
    country: "USA",
    sexe: "Female",
    phone_number: "(987) 654-3210",
    mail: "jane.smith@example.com",
    created_at: "2021-02-01",
    updated_at: "2021-02-02",
    Id_user_create_at: 0,
  },
];
export default op_client_store;