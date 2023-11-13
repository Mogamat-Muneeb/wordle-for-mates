import React, { useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const Account = () => {
  const [user] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState("wordles");
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <ProtectedRoute>
        <h1 className=" text-[16px] lg:text-[24px]  font-extrabold">
          {user?.displayName || ""}
        </h1>
        <div className="max-w-[600px] w-full mx-auto flex justify-center items-center lg:gap-10 gap-5  pt-10">
          <button
            onClick={() => toggleTab("wordles")}
            className={` text-[16px] lg:text-[20px] ${
              activeTab === "wordles" ? "font-bold" : ""
            }`}
          >
            My Wordles
          </button>
          <button
            onClick={() => toggleTab("wordle-with-friends")}
            className={` text-[16px] lg:text-[20px] ${
              activeTab === "wordle-with-friends" ? "font-bold" : ""
            }`}
          >
            Wordle with friends
          </button>
        </div>
        {/* <div className="border-t border-gray-300 max-w-[600px] w-full mx-auto" /> */}
        <div>
          {activeTab === "wordles" && <div>wordles</div>}
          {activeTab === "wordle-with-friends" && (
            <div>wordle-with-friends</div>
          )}
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Account;
