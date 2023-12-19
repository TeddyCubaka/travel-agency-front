import Link from "next/link";
import { PiAirplaneInFlightFill } from "react-icons/pi";
import { FaUserTag } from "react-icons/fa6";
import { AiFillTag } from "react-icons/ai";
import { MdOutlineCardTravel } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  const buttonClass = "flex flex-col items-center";
  return (
    <div className="h-screen flex flex-col gap-12 p-5 rounded-e-3xl bg-app-blue text-white">
      <span className="w-fit h-fit p-2 rounded-lg flex justify-center items-center bg-white">
        <PiAirplaneInFlightFill size={30} className="text-app-blue" />
      </span>
      <div className="flex flex-col gap-5">
        <span className={buttonClass}>
          <FaUserTag size={20} />
          client
        </span>
        <span className={buttonClass}>
          <AiFillTag size={20} />
          produits
        </span>
        <span className={buttonClass}>
          <MdOutlineCardTravel size={20} />
          commandes
        </span>
      </div>
    </div>
  );
};

export default NavBar;
