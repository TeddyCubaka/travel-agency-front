import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import NavBar from "../../components/navbar";
import { MouseEvent, useEffect, useState } from "react";
import { Client, Op_client, Op_command, Op_command_line, Op_product } from "../../interfaces";
import op_client_store, { client_db } from "../../store/client";
import { FaUser } from "react-icons/fa";
import command_store from "../../store/command";
import { generateUUID } from "../../utils/functions";
import sys_user_store from "../../store/user";
import { category, products } from "../../store/products";

interface Input {
  type: string;
  name: string | null;
  id: string | null;
  value: string;
  setter: (e: string) => void;
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
        placeholder={"choix de " + props.name}
        id={props.id}
        onChange={(e) => {
          props.setter(e.currentTarget.value);
        }}
      />
    </div>
  );
};

const ClientInfo = (props: Op_client) => {
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

const SelectInput = ({ options, onChange, title }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div className="w-full rounded-xl py-1 bg-white px-5 flex items-center border border-black whitespace-nowrap">
      <label className="font-bold" htmlFor="">
        {title}
      </label>
      <select className="px-3 py-2 outline-none w-full" value={selectedOption} onChange={handleChange}>
        <option value=""> selectionnez le {title} </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};


const OneClientPage = () => {
  const router = useRouter();
  const [current_client, set_current_client] = useState<Op_client | null>(null);

  const [client_id] = op_client_store((store) => [store.ID]);
  const [user_id, agent_ID] = sys_user_store((store) => [store.ID, store.agent.agent_ID]);
  const commands = command_store();
  commands.commands = ({
    ID: 12,
    stt_tag: generateUUID(),
    client_ID: client_id,
    agent_created_at_ID: agent_ID,
    agent_closed_at_ID: null,
    status: "Panding",
    is_closed: false,
    close_date: "",
    created_at: new Date().toLocaleDateString(),
    updated_at: new Date().toLocaleDateString(),
    Id_user_create_at: user_id,
  });
  const [line_qty, set_line_qty] = useState<number>(1);
  const [line_price, set_line_price] = useState<number>(0);
  const [line_currency, set_line_currency] = useState<string>("USD");
  const [command_cat, set_command_cat] = useState(1);
  const [command_prod, set_command_prod] = useState("");
  const categories = category.map(cat => ({ 'value': cat.ID, 'label': cat.label }));
  const [products_filtered, set_product] = useState<Op_product[]>(products);
  const products_selects = products_filtered.map(prod => ({ 'value': prod.stt_tag, 'label': prod.label }));

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      set_current_client(client_db.find((client) => client.stt_tag == router.query.id))
    }
  }, [router.query.id]);

  useEffect(() => {
    set_product(products.filter(prod => prod.category_ID == command_cat));
  }, [command_cat]);

  useEffect(() => {
    if (typeof command_prod !== "undefined") {
      const prod = products.find(prod => prod.stt_tag === command_prod);
      if (prod) {
        set_line_price(prod.unit_price);
        set_line_currency(prod.currency);
      }
    }
  }, [command_prod, products]);

  return (
    <Layout title="About | Next.js + TypeScript Example">
      <main className="grid grid-cols-[90px_2fr_4fr_3fr] w-full max-h-screen overflow-hidden bg-cover bg-no-repeat">
        <NavBar />
        <ClientInfo {...current_client} />

        <div className="px-5">
          <h2 className="text-lg font-[400] py-5">Passer une commande pour {current_client == null ? "..." : current_client.first_name} </h2>
          <div className="flex flex-col gap-5">
            <SelectInput options={categories} onChange={set_command_cat} title={'category'} />
            <SelectInput options={products_selects} onChange={set_command_prod} title={'produit'} />
            <div>{command_prod}</div>
            <Input
              {...{
                type: "number", name: "quantité", id: "quantity", value: "" + line_qty, setter: (val) => {
                  if (val == "") set_line_qty(1)
                  if (!Number.isNaN(parseInt(val))) set_line_qty(parseInt(val))
                }
              }}
            />
            <Input
              {...{
                type: "text", name: "prix", id: "price", value: "" + line_price, setter: () => { }
              }}
            />
            <div className="w-full rounded-xl py-1 bg-white px-5 flex items-center border border-black whitespace-nowrap">
              <div className="w-full">
                <label className="font-bold" htmlFor="">prix :</label>
                <span> {line_price} </span>
              </div>
              <div className="w-full">
                <label className="font-bold" htmlFor="">devise :</label>
                <span> {line_currency} </span>
              </div>
            </div>
            <button className="bg-app-blue text-base font-[400] text-white px-3 outline-none focus:ring-2 focus:ring-blue-500 w-full rounded-xl py-3"
              onClick={() => {
                let prod = products.find(prod => prod.stt_tag === command_prod);
                if (prod) {
                  let command_line: Op_command_line = {
                    ID: commands.commands_line.length,
                    stt_tag: generateUUID(),
                    product_ID: prod.ID,
                    unit_price: "" + prod.unit_price,
                    quantity: "" + line_qty,
                    created_at: new Date().toLocaleDateString(),
                    updated_at: new Date().toLocaleDateString(),
                    Id_user_create_at: user_id,
                  }
                  commands.add_command_line(command_line);
                  set_product(products);
                  set_command_prod("")
                } else alert('veuilez selectionner un produit')

              }}
            >ajoute le produit </button>
          </div>

        </div>

        <div className="p-5 rounded-l-3xl bg-app-blue text-white max-h-screen overflow-y-auto">
          <h3 className="text-lg font-[400]">Commandes :</h3>
          <ul className="black h-full list-disc px-4 mb-3">
            <li> ID : {commands.commands.ID} </li>
            <li> identifiant : <span className="p-2 bg-gray-400 rounded-3xl">{commands.commands.stt_tag}</span> </li>
            <li> client_ID : {commands.commands.client_ID} </li>
            <li> agent_created_at_ID : {commands.commands.agent_created_at_ID} </li>
            <li> agent_closed_at_ID : {commands.commands.agent_closed_at_ID} </li>
            <li> status : {commands.commands.status} </li>
            <li> is_closed : {commands.commands.is_closed} </li>
            <li> Id_user_create_at : {commands.commands.Id_user_create_at} </li>
          </ul>
          <h3 className="text-lg font-[400]">{commands.commands_line.length} produits : </h3>
          <div className="w-full flex flex-col gap-2.5 ">
            {
              commands.commands_line.map(line => (
                <div className="flex flex-col bg-white my-3 text-black">
                  <span className="p-2 bg-gray-400 rounded-3xl">{line.stt_tag}</span>
                  <span> nom : {products.find(prod => prod.ID === line.product_ID).label}</span>
                  <span>prix unitaire : {line.unit_price}</span>
                  <span>quantité : {line.quantity}</span>
                </div>
              ))
            }
          </div>
          <button onClick={() => console.log(commands)}>close</button>
        </div>

      </main>
    </Layout>
  );
};
export default OneClientPage;
