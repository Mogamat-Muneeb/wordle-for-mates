import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Modal({ isCorrect, solution, turn, createName }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const createAWord = () => {
    // window.location.reload();
    navigate("/");
  };
  const shareResult = () => {
    navigator.clipboard
      .writeText(
        ` I found the solution in ${turn} ${
          turn > 1 ? "guesses" : "guess"
        } on https://wordle-for-mates.vercel.app`
      )
      .then(() => {
        setLinkCopied(true);
      })
      .catch((error) => {
        console.error("Failed to copy the link to the clipboard:", error);
      });
  };
  return (
    <div className="modal">
      {isCorrect && (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="font-bold text-[#5ac85a]">You Win!</h1>
          {/* <p className="text-[14px]">
            {createName.charAt(0).toUpperCase() + createName.slice(1)}'s word
            was
            <span className="font-semibold text-[#5ac85a] "> {solution}</span>
          </p> */}
          <p className="text-[14px]">
            You found the solution in
            <span className="font-semibold text-[#5ac85a]"> {turn} </span>
            {turn > 1 ? "guesses" : "guess"}
          </p>
          <span className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <button
              onClick={createAWord}
              className="text-[14px] bg-[#5ac85a] py-2 px-4 rounded  text-white"
            >
              {pathName === "/wordle-single" ? "Play again" : "Create a word"}
            </button>
            <button
              onClick={shareResult}
              className="text-[14px] bg-[#e2cc68] py-2 px-4 rounded  text-white"
            >
              {linkCopied ? "Link Copied" : "    Share results"}
            </button>
          </span>
        </div>
      )}
      {!isCorrect && (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="font-bold text-[#ff2f00]">You Lost!</h1>

          {createName ? (
            <p className="text-[14px]">
              {createName.charAt(0).toUpperCase() + createName.slice(1)}'s word
              was
              <span className="font-semibold text-[#ff2f00] "> {solution}</span>
            </p>
          ) : (
            <p className="text-[14px]">
              The word was
              <span className="font-semibold text-[#ff2f00] "> {solution}</span>
            </p>
          )}

          <p className="text-[14px]"> Better luck next time!!</p>
          <span className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <button
              onClick={createAWord}
              className="text-[14px] bg-[#5ac85a] py-2 px-4 rounded  text-white"
            >
              {pathName === "/wordle-single" ? "Play again" : "Create a word"}
            </button>
            <button
              onClick={shareResult}
              className="text-[14px] bg-[#e2cc68] py-2 px-4 rounded  text-white"
            >
              {linkCopied ? "Link Copied" : "Share results"}
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
