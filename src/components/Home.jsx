import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-between w-10/12 h-full max-w-md  mx-auto text-center pt-[15%]">
      <p className=" px-4 pt-4 pb-2  md:text-xl text-[16px] font-extrabold text-center text-[#212529]">
        Get 6 chances to guess <br /> a 5-letter word.
      </p>
      <p className=" md:text-[16] text-[14px] font-normal text-center text-[#212529]">
        Like Wordle but with a twist.
      </p>
      <p className="pb-4 md:text-[16] text-[14px] font-normal text-center text-[#212529]">
        Login or Sign Up to track your games statistics.
      </p>
      <div className="flex flex-col w-full gap-4 md:flex-row">
        <Link
          to="/wordle-single"
          className="w-full p-4 text-lg font-bold text-center text-white transition-all duration-30 rounded outline-none hover:bg-[#5ac85a] bg-[#212529] cursor-pointer"
        >
          Wordle
        </Link>
        <Link
          to="/with-a-friend"
          className="w-full p-4 text-lg font-bold text-center transition-all duration-30 text-white rounded outline-none hover:bg-[#5ac85a] bg-[#212529] cursor-pointer"
        >
          Wordle with a friend
        </Link>
      </div>
    </div>
  );
};

export default Home;
