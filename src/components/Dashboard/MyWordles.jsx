import React from "react";

const MyWordles = ({ gamesData, wins, losses, currentStreak, maxStreak }) => {
  let game = {
    timestamp: new Date(),
  };

  const DateOfGame = `${game.timestamp.getDate()} ${getMonthAbbreviation(
    game.timestamp.getMonth()
  )} ${game.timestamp.getFullYear()}`;

  function getMonthAbbreviation(monthIndex) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  }
  return (
    <>
      <div className="flex flex-col items-start justify-start ">
        <div className="flex flex-col items-start justify-start ">
          <div className="flex items-end justify-start gap-3 lg:gap-6">
            <div className="flex flex-col items-center justify-center ">
              <p className="text-[24px] font-semibold flex justify-start items-start">
                {gamesData.length}
              </p>
              <p className="font-medium text-[14px] text-[#212529] flex justify-end items-end ">
                Played
              </p>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <p className="text-[24px] font-semibold flex justify-start items-start">
                {wins}
              </p>
              <p className="font-medium text-[14px] text-[#212529] flex justify-end items-end">
                Wins
              </p>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <p className="text-[24px] font-semibold flex justify-start items-start">
                {losses}
              </p>
              <p className="font-medium text-[14px] text-[#212529] flex justify-end items-end">
                Losses
              </p>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <p className="text-[24px] font-semibold flex justify-start items-start">
                {currentStreak}
              </p>
              <p className="font-medium text-[14px] text-[#212529] flex justify-end items-end">
                Current Streak
              </p>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <p className="text-[24px] font-semibold flex justify-start items-start">
                {maxStreak}
              </p>
              <p className="font-medium text-[14px] text-[#212529] flex justify-end items-end">
                Max Streak
              </p>
            </div>
          </div>
          <p className="font-extrabold text-[24px] text-[#212529] pt-10">
            Games Played
          </p>
          <div>
            {gamesData.map((game, index) => (
              <div key={index} className="flex items-center gap-2 ">
                <p className="flex justify-start items-start text-[14px] tracking-tighter">
                  {index + 1}
                </p>
                <h2
                  className={` font-semibold capitalize   ${
                    game.result === "win" ? "text-[#5ac85a]" : "text-red-600"
                  }`}
                >
                  {game.result}
                </h2>
                -<p className="text-[14px]"> {DateOfGame}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyWordles;
