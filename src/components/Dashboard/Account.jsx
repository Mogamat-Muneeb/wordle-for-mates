import React, { useState } from "react";
import ProtectedRoute from "../ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import MyWordles from "./MyWordles";
import WordleWithFriends from "./WordleWithFriends";

const Account = () => {
  const [user] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState("wordles");
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <ProtectedRoute>
        <div className="lg:flex hidden items-center justify-between  max-w-[1280px] w-full mx-auto">
          <div className="">
            <h1 className=" text-[16px] lg:text-[20px]  font-bold">
              Statistics
            </h1>
          </div>
          <div className="flex flex-col items-start justify-start ">
            <p className="text-[14px] leading-3">{user?.displayName || ""}</p>
            <p className="text-[14px]">{user?.email || ""}</p>
          </div>
        </div>
        <div className="md:grid md:grid-cols-12 max-w-[1280px] w-full mx-auto lg:p-0 p-4">
          <div className="flex flex-col items-start justify-start space-y-2 md:py-6 md:col-span-3 md:min-h-screen">
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
      </ProtectedRoute>
    </>
  );
};

export default Account;
