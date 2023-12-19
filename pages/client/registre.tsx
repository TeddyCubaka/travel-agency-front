import Link from "next/link";
import Layout from "../../components/Layout";
import { PiAirplaneInFlightFill } from "react-icons/pi";
import { FaUserTag } from "react-icons/fa6";
import { AiFillTag } from "react-icons/ai";
import { MdOutlineCardTravel } from "react-icons/md";
import { FaUser } from "react-icons/fa";

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
    reset?: boolean;
    set_reset?: Dispatch<SetStateAction<boolean>>;
}

interface Button {
    subject: string;
    action: () => void;
}

const Input = (props: Input) => {
    useEffect(() => {
        if (props.reset) props.setter("");
    }, [props.reset, props.set_reset])
    if (props.type == "tel") {
        return (
            <div className="w-full rounded-xl py-1 bg-white px-5 flex items-center border border-black whitespace-nowrap">
                <label className="font-[400]" htmlFor={props.id}>
                    {" "}
                    {props.name}{" "}
                </label>
                <input
                    className="px-3 py-1 outline-none w-full"
                    value={props.value}
                    name={props.name}
                    id={props.id}
                    maxLength={13}
                    type="tel"
                    placeholder="Numéro de téléphone"
                    pattern="+[0-9]{3} [0-9]{9}"
                    required
                    onChange={(e) => {
                        props.setter(e.currentTarget.value);
                    }}
                />
            </div>
        );
    }
    return (
        <div className="w-full rounded-xl py-1 bg-white px-5 flex items-center border border-black whitespace-nowrap">
            <label className="font-[400]" htmlFor={props.name}>
                {" "}
                {props.name}{" "}
            </label>
            <input
                className="px-3 py-2 outline-none w-full"
                value={props.value}
                type={props.type}
                name={props.name}
                id={props.name}
                required
                onChange={(e) => {
                    props.setter(e.currentTarget.value);
                }}
            />
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
        <div
            className="bg-white w-full p-5 flex flex-col rounded-xl cursor-pointer"
            onClick={() => router.push("client/" + props.stt_tag)}
        >
            <span className="font-[400]">ID : {props.stt_tag} </span>
            <span>first_name : {props.first_name} </span>
            <span>second_name : {props.second_name} </span>
        </div>
    );
};

const Client_form = (client_store: Op_client) => {
    const [client, set_client] = useState<Client>({
        first_name: "",
        second_name: "",
        address: "",
        city: "",
        country: "",
        sexe: "",
        phone_number: "",
        mail: "",
    });
    const set_value = (val) => set_client((prev) => ({ ...prev, ...val }));
    const client_data: Input[] = [
        {
            type: "text",
            name: "nom",
            id: "",
            value: client.first_name,
            setter: (val) => set_value({ first_name: val }),
        },
        {
            type: "text",
            name: "post-nom",
            id: "",
            value: client.second_name,
            setter: (val) => set_value({ second_name: val }),
        },
        {
            type: "text",
            name: "adresse",
            id: "",
            value: client.address,
            setter: (val) => set_value({ address: val }),
        },
        {
            type: "text",
            name: "ville",
            id: "",
            value: client.city,
            setter: (val) => set_value({ city: val }),
        },
        {
            type: "text",
            name: "pays",
            id: "",
            value: client.country,
            setter: (val) => set_value({ country: val }),
        },
        {
            type: "text",
            name: "sexe",
            id: "",
            value: client.sexe,
            setter: (val) => set_value({ sexe: val }),
        },
        {
            type: "tel",
            name: "téléphone",
            id: "",
            value: client.phone_number,
            setter: (val) => set_value({ phone_number: val }),
        },
        {
            type: "text",
            name: "mail",
            id: "",
            value: client.mail,
            setter: (val) => set_value({ mail: val }),
        },
    ];
    const [reset, set_reset] = useState<boolean>(false);
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        set_reset(true);
    };

    return (
        <form action="" className="border-2 border-black rounded-lg p-5 flex flex-col items-center justify-between h-full gap-2" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold">Inscrire un client</h3>
            {client_data.map((input) => {
                input = { ...input, reset, set_reset };
                return (
                    <Input {...input} key={input.name} />
                )
            })}
            <Button
                action={() => {
                    console.log(client_db);

                    client_store.create(client);
                }}
                subject="Enreigistrer le client"
            />
        </form>
    )
}

const ClientPage = () => {
    const client_store = op_client_store();

    return (
        <Layout title="About | Next.js + TypeScript Example">
            <main className="grid grid-cols-[90px_1fr] w-full h-screen overflow-hidden bg-cover bg-no-repeat">
                <NavBar />
                <div className="grid grid-cols-2 h-screen">
                    <div className="p-10">
                        <Client_form {...client_store} />
                    </div>
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
