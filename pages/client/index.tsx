import Link from "next/link";
import Layout from "../../components/Layout";
import { IoSearch } from "react-icons/io5";

import { useRouter } from "next/router";
import op_client_store, { client_db } from "../../store/client";
import { Dispatch, FormEvent, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { Client, Op_client } from "../../interfaces";
import NavBar from "../../components/navbar";

interface Input {
  type: string;
  name: string | null;
  id: string | null;
  value: string;
  setter: (e: string) => void;
  on_key_press: (e: string) => void;
}

interface Button {
  subject: string;
  action: () => void;
}

const Input = (props: Input) => {
  return (
    <div className="w-full rounded-xl py-1 bg-white px-5 flex items-center border border-black whitespace-nowrap">
      <input
        className="px-3 py-2 outline-none w-full"
        value={props.value}
        type="search"
        name={props.name}
        id={props.name}
        placeholder="Recherche des clients"
        required
        onKeyDown={(e) => {
          if (e.key == "Enter") props.on_key_press(props.value);
        }}
        onChange={(e) => {
          props.setter(e.currentTarget.value);
        }}

      />
      <IoSearch size={20} />
    </div>
  );
};

const Button = (props: Button) => {
  return (
    <button
      type="reset"
      className="bg-app-blue text-base font-[400] text-white px-3 outline-none focus:ring-2 focus:ring-blue-500 w-full rounded-xl py-3"
      onClick={props.action}
    >
      {" "}
      {props.subject}{" "}
    </button>
  )
}

const Recent_client = (props: Op_client) => {
  const router = useRouter();
  return (
    <div
      className="bg-white w-full p-5 h-fit flex flex-col rounded-xl cursor-pointer"
      onClick={() => router.push("client/" + props.stt_tag)}
    >
      <div className="text-lg font-[400]">Client récent</div>
      <span>first_name : {props.first_name} </span>
      <span>second_name : {props.second_name} </span>
      <span>address : {props.address} </span>
      <span>city : {props.city} </span>
      <span>country : {props.country} </span>
      <span>sexe : {props.sexe} </span>
      <span>phone_number : {props.phone_number} </span>
      <span>mail : {props.mail} </span>
    </div>
  );
};

const Clients = (props: Op_client) => {
  const router = useRouter();
  return (
    <Link href={"client/" + props.stt_tag}
      className="bg-white w-full p-5 border-[0.5px] border-black h-fit flex flex-col rounded-xl cursor-pointer"
      onClick={() => {
        router.push("/client/" + props.stt_tag)
      }}
    >
      <div className="text-lg font-[400]">{props.first_name} {props.second_name}</div>
      <span>identifiant : {props.stt_tag} </span>
      <span>address : {props.address} </span>
      <span>téléphone : {props.phone_number} </span>
      <span>adresse mail : {props.mail} </span>
    </Link>
  );
};

const Client_filter = () => {
  const [client_filtered, set_client_filtered] = useState(client_db);
  const [search_word, set_search_word] = useState<string>("");

  const filtre_client = (search: string) => {
    set_client_filtered(client_db.filter((client) => {
      const name = (client.first_name + client.second_name).toLowerCase();
      if (name.includes(search.toLowerCase())) {
        return client;
      }
      return null;
    }));
  }

  const input: Input = {
    type: "text",
    name: "nom",
    id: "",
    value: search_word,
    setter: (val) => { set_search_word(val); },
    on_key_press: (val) => filtre_client(val)
  }

  return (
    <div className="p-5 flex flex-col gap-5 max-h-screen">
      <Input {...input} />
      <div className="h-full flex flex-col gap-3 overflow-y-auto">
        {client_filtered.length == 0 ?
          <div className="h-full w-full flex items-center justify-center">Aucune donnée à afficher </div>
          : client_filtered.map((client) => (
            <Clients {...client} key={client.stt_tag + client.first_name} />
          ))
        }
      </div>
    </div>
  )
}


const ClientPage = () => {
  const client_store = op_client_store();

  return (
    <Layout title="About | Next.js + TypeScript Example">
      <main className="grid grid-cols-[90px_1fr] w-full h-screen overflow-hidden bg-cover bg-no-repeat">
        <NavBar />
        <div className="grid grid-cols-2 h-screen">
          <Client_filter />
          <div className="bg-app-blue p-5  max-h-screen flex flex-col gap-2.5">
            <Recent_client {...client_store} />
            {client_db.length > 0 ? (
              <h2 className="text-lg font-bold text-white">
                Utilsateur créer par vous.
              </h2>
            ) : (
              ""
            )}
            <div className="w-full flex flex-col gap-2.5 overflow-y-auto">
              {client_db.map((client) => (
                <Clients {...client} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ClientPage;
