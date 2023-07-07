import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <div className="z-[1000]">
      <Link to="/auth">SignUp</Link>
      <h1 className="z-[1000] font-extrabold text-[30px] p-1 bg-white text-[#212529] border-b-[1px] border-[#eee] w-full fixed right-0 left-0">
        {pathName === "/wordle-single" ? (
          <>
            <span className="text-[#5ac85a]">Wordle</span>
          </>
        ) : (
          <>
            <span className="text-[#5ac85a]">Wordle</span> for mates!
          </>
        )}
      </h1>
    </div>
  );
}

export default Header;
