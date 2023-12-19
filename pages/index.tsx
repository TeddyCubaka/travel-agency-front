import Link from "next/link";
import Layout from "../components/Layout";
import { FaUser } from "react-icons/fa";
import sys_user_store, { default_user } from "../store/user";
import { useRouter } from "next/router";
import NavBar from "../components/navbar";

interface Input {
  type: string;
  name: string | null;
  id: string | null;
  setter: (e: string) => void;
}

interface Button {
  subject: string;
  action: () => void;
}

const Input = (props: Input) => (
  <div className="w-full rounded-xl py-1 bg-white px-5 flex items-center">
    <label className="font-[400] font-lg" htmlFor="">
      {" "}
      {props.name}{" "}
    </label>
    <input
      className="px-3 py-2 outline-none w-full "
      type={props.type}
      name={props.name}
      id={props.id}
      onChange={(e) => {
        props.setter(e.currentTarget.value);
      }}
    />
  </div>
);

const Button = (props: Button) => (
  <button
    className="bg-app-blue text-base font-bold text-white px-3 outline-none focus:ring-2 focus:ring-blue-500 w-full rounded-xl py-3"
    onClick={props.action}
  >
    {" "}
    {props.subject}{" "}
  </button>
);

const Connexion = () => {
  const user_store = sys_user_store();
  const router = useRouter();
  return (
    <div className="border w-[70%] border-black p-5 rounded-xl flex flex-col items-center gap-5 backdrop-blur bg-blur bg-[#fffff02]">
      <span className="block w-fit h-fit border border-black rounded-full p-5">
        <FaUser size={60} />
      </span>
      <div className="text-xl font-bold ">Connexion</div>
      <div className="flex flex-col gap-5 w-full">
        <Input
          type="email"
          name="login"
          id={""}
          setter={user_store.set_login}
        />
        <Input type="password" name="pwd" id={""} setter={user_store.set_pwd} />
      </div>
      <Button
        subject="Se connecter"
        action={() => {
          if (user_store.login == default_user.login && user_store.pwd == default_user.pwd) {
            user_store.hydrate();
            router.push("client");
          } else {
            alert("mot de passe ou numéro de téléphone incorect")
          }
        }}
      />
    </div>
  );
};

const IndexPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <main
        className="grid grid-cols-[90px_1fr] w-full h-screen bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/asset/images/plane.webp')",
        }}
      >
        <NavBar />

        <div className="grid grid-cols-2 h-full">
          <div className="flex justify-center items-center">
            <div className="border w-[70%] border-black p-5 rounded-xl flex flex-col items-center gap-5 backdrop-blur bg-blur bg-[#fffff02]">
              <h1 className="text-3xl font-black ">Travel Angency</h1>
              <div className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                condimentum, nunc ut sagittis maximus, neque dolor pharetra
                metus, et dignissim elit est ut justo. Nam euismod, elit sed
                dictum feugiat, lacus justo efficitur tellus, placerat facilisis
                nulla nulla a neque. Vivamus pretium ac erat non molestie.
                Phasellus dictum, sapien a tincidunt congue, velit augue auctor
                risus, in tincidunt tortor lectus et nisl.
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Connexion />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default IndexPage;
