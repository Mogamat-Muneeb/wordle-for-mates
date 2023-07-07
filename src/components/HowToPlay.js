import React from "react";

const HowToPlay = (props) => {
  return (
    <div className="modal2">
      <div className="flex flex-col gap-3">
        <span className="flex items-center w-full">
          <span className="flex items-center justify-center w-full">
            <p className="font-bold md:text-[20px] text-[16px]">How To Play</p>
          </span>
          <span className="flex items-end justify-end ">
            <button onClick={props.handleShow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </span>
        </span>
        <span className="flex flex-col items-center justify-center gap-2">
          <p className=" text-[14px]">
            You have 6 tries to guess
            <span className="text-[#5ac85a] font-extrabold px-1">
              {props.createName.charAt(0).toUpperCase() + props.createName.slice(1)}'s
            </span>
            secret word! All guesses must be valid, English words. For example,
            if the secret word is CONES, and your first guess is CHAIR, you will
            see:
          </p>
          <img
            src="https://i.postimg.cc/L8YTnL76/Screenshot-2023-07-04-222201.png"
            alt=""
            className="w-[200px] object-cover"
          />
        </span>
        <span className="flex flex-col items-center justify-center gap-2">
          <p className=" text-[14px]">
            Green means the letter is in the word and in the correct position.
            If your second guess is BROTH, you will see:
          </p>
          <img
            src="https://i.postimg.cc/g2CKRrFy/Screenshot-2023-07-04-222228.png"
            alt=""
            className="w-[200px] object-cover"
          />
        </span>
        <span className="flex flex-col items-center justify-center gap-2">
          <p className=" text-[14px]">
            Yellow means the letter is in the word but in the incorrect
            position. Solve the secret word within 6 tries and use the colored
            tiles as clues!
          </p>
          <img
            src="https://i.postimg.cc/mr7ySRBv/Screenshot-2023-07-04-222331.png"
            alt=""
            className="w-[200px] object-cover"
          />
        </span>
      </div>
    </div>
  );
};

export default HowToPlay;
