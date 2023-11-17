import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import MyWordles from "./MyWordles";
import WordleWithFriends from "./WordleWithFriends";
import { IoMdClose } from "react-icons/io";

const Account = ({ toggleModal }) => {
  const [user] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState("wordles");
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white  mx-auto md:max-h-[700px] h-[400px] max-w-full md:h-[500px] overflow-y-auto rounded-lg px-4 shadow-lg ">
      <div className="sticky top-[-17px] items-center justify-between flex max-w-[980px] w-full mx-auto  z-[60] bg-white h-[40px]">
        <h1 className="text-[16px] lg:text-[20px]  font-bold">Statistics</h1>
        <button onClick={toggleModal}>
          <IoMdClose />
        </button>
      </div>
      <div className="flex flex-col gap-4 ">
        <div className="max-w-[700px] w-full mx-auto flex justify-between items-center">
          <button
            onClick={() => toggleTab("wordles")}
            className={` text-[16px]  ${
              activeTab === "wordles" ? "font-bold text-[#5ac85a]" : ""
            }`}
          >
            My Wordles
          </button>
          <button
            onClick={() => toggleTab("wordle-with-friends")}
            className={` text-[16px] ${
              activeTab === "wordle-with-friends"
                ? "font-bold text-[#5ac85a]"
                : ""
            }`}
          >
            Wordle with friends
          </button>
        </div>
        <div className="p-4 space-y-8 bg-white md:col-span-9">
          <div className="">
            {activeTab === "wordles" && (
              <>
                <MyWordles />
              </>
            )}
            {activeTab === "wordle-with-friends" && (
              <>
                <WordleWithFriends />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
