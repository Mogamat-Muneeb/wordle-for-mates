import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

function Header() {
  const location = useLocation();
  const pathName = location.pathname;
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signUserOut = async () => {
    if (auth) {
      await signOut(auth);
      navigate("/");
    }
  };
  return (
    <div className="z-[1000] bg-white border-b-[1px] border-[#eee] fixed right-0 left-0 lg:px-0 px-4 ">
      <div
        className={`z-[1000] p-1  w-full  justify-between items-center max-w-[1280px]  mx-auto ${
          pathName === "/wordle-single" || pathName === "/account"
            ? "flex "
            : "flex lg:flex-row flex-col"
        }`}
      >
        <h1 className=" font-extrabold text-[30px] text-[#212529]  ">
          {pathName === "/wordle-single" || pathName === "/account" ? (
            <>
              <span className="text-[#5ac85a]">Wordle</span>
            </>
          ) : (
            <>
              <span className="text-[#5ac85a]">Wordle</span> for mates!
            </>
          )}
        </h1>

        <div>
          {user ? (
            <>
              <div className="flex items-center justify-center gap-3">
                <Link to="/account">
                  <h2>{user?.displayName || ""}</h2>
                </Link>
                <button
                  onClick={signUserOut}
                  className="font-bold text-[16px] "
                >
                  logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">Login or Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
