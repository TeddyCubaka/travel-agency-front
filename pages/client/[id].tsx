import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import NavBar from "../../components/navbar";
import { MouseEvent, useEffect, useState } from "react";
import { Client, Op_client, Op_command } from "../../interfaces";
import op_client_store from "../../store/client";
import { FaUser } from "react-icons/fa";
import command_store from "../../store/command";
import { generateUUID } from "../../utils/functions";

interface Input {
  type: string;
  name: string | null;
  id: string | null;
  value: string;
  setter: (e: string) => void;
}

interface Button {
  subject: string;
  type: string;
  action: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

const Input = (props: Input) => {
  return (
    <div className="w-full rounded-xl py-1 bg-white px-5 flex items-center border border-black whitespace-nowrap">
      <label className="font-bold" htmlFor="">
        {" "}
        {props.name}{" "}
      </label>
      <input
        className="px-3 py-2 outline-none w-full"
        value={props.value}
        type={props.type}
        name={props.name}
        id={props.id}
        onChange={(e) => {
          props.setter(e.currentTarget.value);
        }}
      />
    </div>
  );
};

const Button = (props: Button) => (
  <button
    className="bg-app-blue text-base font-bold text-white px-3 outline-none focus:ring-2 focus:ring-blue-500 w-full rounded-xl py-3"
    onClick={(e) => props.action(e)}
  >
    {" "}
    {props.subject}{" "}
  </button>
);

const InputSelect = (props: Input) => {
  return (
    <div className="w-full rounded-xl py-1 bg-white px-5 flex items-center border border-black gap-3 whitespace-nowrap">
      <input
        className="px-3 py-2 outline-none "
        value={props.value}
        type="radio"
        name={props.name}
        id={props.id}
        onChange={(e) => {
          props.setter(e.currentTarget.value);
        }}
      />
      <label className="font-bold" htmlFor="">
        {" "}
        {props.name}{" "}
      </label>
    </div>
  );
};

interface Form {
  arr: Input[];
  setter: () => void;
  title: string;
}

const form = (props: Form) => {
  const button: Button = {
    subject: "",
    type: "",
    action: (e) => {
      e.preventDefault();
      props.setter();
    },
  };
  return (
    <form>
      <h2> {props.title} </h2>
      {props.arr.map((input) => (
        <InputSelect {...input} />
      ))}
      <Button {...button} />
    </form>
  );
};

const ClientInfo = (props: Op_client) => {
  const router = useRouter();
  return (
    <div className="bg-white w-full p-5 h-full flex flex-col border-r border-black py-10 justify-start">
      <span className="rounded-full w-fit p-3 border border-black mx-auto">
        {" "}
        <FaUser size={30} />{" "}
      </span>
      <h3 className="text-lg font-bold">Client</h3>
      <span>nom : {props.first_name} </span>
      <span>post-nom : {props.second_name} </span>
      <span>adresse : {props.address} </span>
      <span>ville : {props.city} </span>
      <span>pays : {props.country} </span>
      <span>sexe : {props.sexe} </span>
      <span>téléphone : {props.phone_number} </span>
      <span>adresse mail : {props.mail} </span>
    </div>
  );
};

const OneClientPage = () => {
  const router = useRouter();
  const client_store = op_client_store((store) => store);
  const [user_id] = op_client_store((store) => [store.ID]);
  const [client_ID, set_client_ID] = useState<string>("");
  const [commands] = command_store((store) => [store.commands]);
  const [command, set_cmmand] = useState<Op_command>({
    ID: commands.length,
    stt_tag: generateUUID(),
    client_ID: client_ID,
    agent_created_at_ID: user_id,
    agent_closed_at_ID: null,
    status: "Panding",
    is_closed: false,
    close_date: "",
    created_at: new Date().toLocaleDateString(),
    updated_at: new Date().toLocaleDateString(),
    Id_user_create_at: user_id,
  });

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string")
      set_client_ID(router.query.id);
  }, [router.query.id]);
  return (
    <Layout title="About | Next.js + TypeScript Example">
      <main className="grid grid-cols-[90px_1fr_2fr_2fr] w-full h-screen overflow-hidden bg-cover bg-no-repeat">
        <NavBar />
        <ClientInfo {...client_store} />
        <div className="border-r border-black">
          <h2>Passer une commande</h2>
          <form action="">
            <Input
              {...{ type: "", name: "", id: "", value: "", setter: ()=>{} }}
            />
          </form>
        </div>
      </main>
    </Layout>
  );
};
export default OneClientPage;
