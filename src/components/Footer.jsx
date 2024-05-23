import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="h-[60px] md:pb-0 pb-2 bg-white flex md:flex-row flex-col items-center justify-between fixed  right-0 left-0 bottom-0 max-w-[1228px] mx-auto w-full px-2">
      <p className="text-[12px] flex justify-between text-center  ">
        <span>
          Made by
          <span className="pl-1 font-bold cursor-pointer text-[12px] bg-white text-[#5ac85a]">
            <Link target="_blank" to="https://muneebdavids.com">
              Mog.Muneeb Davids
            </Link>
          </span>
        </span>
      </p>

      <p className="text-[12px] flex flex-col text-center  ">
{/*         <Link to="https://wa.me/+27761621649" target="_blank">
          <span className="font-bold">Bugs? </span> Please report at 0761621649
        </Link> */}
      </p>
      <p className="text-[12px] bg-white text-[#5ac85a]   justify-end items-center   flex ">
        <span>Wordle for mates ©</span> <span> {currentYear}</span>
      </p>
    </div>
  );
}

export default Footer;
