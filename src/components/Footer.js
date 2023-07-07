import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="h-[60px] bg-white flex items-center justify-center md:fixed relative right-0 left-0 bottom-0">
      <p className="text-[12px] flex flex-col text-center">
        <span>
          Made by
          <span className="pl-1 font-bold cursor-pointer text-[12px] bg-white text-[#5ac85a]">
            <Link target="_blank" to="https://mog-muneeb-davids.web.app">
              Mog.Muneeb Davids
            </Link>
          </span>
        </span>
        <span>
          <span className="font-bold">Bugs?</span> Please report at{" "}
          <a href="https://wa.me/0761621649">0761621649</a>
        </span>
      </p>
    </div>
  );
}

export default Footer;
