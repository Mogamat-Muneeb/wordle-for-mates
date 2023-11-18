import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { TbLogout } from "react-icons/tb";
import ReUsableModal from "./ReusableModal";
import Account from "./Dashboard/Account";
import { Login } from "./Login";

function Header() {
  const [user] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  const signUserOut = async () => {
    if (auth) {
      await signOut(auth);
      // navigate("/");
    }
  };

  const toggleModal = useCallback(() => {
    setShowModal((prevState) => !prevState);
  }, []);
  const toggleModalLogIn = useCallback(() => {
    setShowLogIn((prevState) => !prevState);
  }, []);
  return (
    <>
      {showModal && (
        <ReUsableModal handleModalOpen={toggleModal}>
          <Account toggleModal={toggleModal} />
        </ReUsableModal>
      )}
      {showLogIn && (
        <ReUsableModal handleModalOpen={toggleModalLogIn}>
          <Login toggleModalLogIn={toggleModalLogIn} />
        </ReUsableModal>
      )}
      <div className="z-[1000] bg-white border-b-[1px] border-[#eee] fixed right-0 left-0 lg:px-0 px-4 ">
        <div
          className={`z-[1000] p-1  w-full  justify-between items-center max-w-[1280px]  mx-auto flex`}
        >
          <h1 className=" md:font-extrabold font-semibold md:text-[30px] text-[20px] text-[#212529]  cursor-pointer  ">
            <Link to={"/"}>
              <span>
                <span className="text-[#5ac85a] ">Wordle</span> for mates!
              </span>
            </Link>
          </h1>
          <div>
            {user ? (
              <>
                <div className="flex items-center justify-center gap-2 md:gap-1">
                  <button onClick={toggleModal}>
                    <img
                      src={user?.photoURL}
                      alt=""
                      className="rounded-full w-7 h-7 md:w-8 md:h-8"
                    />
                  </button>
                  <button onClick={toggleModal}>
                    <h2 className="hidden md:block">
                      {user?.displayName || ""}
                    </h2>
                  </button>
                  <button
                    onClick={signUserOut}
                    className="font-semibold text-[16px] md:block hidden"
                  >
                    Log Out
                  </button>
                  <button
                    onClick={signUserOut}
                    className="font-bold text-[23px] md:hidden block"
                  >
                    <TbLogout />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button onClick={toggleModalLogIn}>Login or Register</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
