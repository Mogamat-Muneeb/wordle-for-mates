import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";

const MyWordles = () => {
  const [user] = useAuthState(auth);

  const [gamesData, setGamesData] = useState([]);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  let currentStreak = 0;
  let maxStreak = 0;

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const userId = user?.uid;
        const userGamesCollection = collection(db, "userGames");
        const querySnapshot = await getDocs(userGamesCollection);

        const games = [];
        let winCount = 0;
        let lossCount = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.userId === userId) {
            games.push({
              result: data.result,
              timestamp: data.timestamp.toDate(),
            });

            if (data.result === "win") {
              winCount++;
            } else if (data.result === "lose") {
              lossCount++;
            }
          }
        });

        setGamesData(games);
        setWins(winCount);
        setLosses(lossCount);
      } catch (error) {
        console.error("Error fetching games data:", error);
      }
    };

    if (user) {
      fetchGamesData();
    }
  }, [user]);

  for (let i = 0; i < gamesData.length; i++) {
    const result = gamesData[i].result;

    if (result === "win") {
      currentStreak++;
    } else {
      maxStreak = Math.max(maxStreak, currentStreak);
      currentStreak = 0;
    }
  }

  maxStreak = Math.max(maxStreak, currentStreak);
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
              <p className="md:text-[24px] text-[20px] font-semibold flex justify-start items-start">
                {gamesData.length}
              </p>
              <p className="font-medium md:text-[14px] text-[12px] text-[#212529] flex justify-end items-end ">
                Played
              </p>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <p className="md:text-[24px] text-[20px] font-semibold flex justify-start items-start">
                {wins}
              </p>
              <p className="font-medium md:text-[14px] text-[12px] text-[#212529] flex justify-end items-end">
                Wins
              </p>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <p className="md:text-[24px] text-[20px] font-semibold flex justify-start items-start">
                {losses}
              </p>
              <p className="font-medium md:text-[14px] text-[12px] text-[#212529] flex justify-end items-end">
                Losses
              </p>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <p className="md:text-[24px] text-[20px] font-semibold flex justify-start items-start">
                {currentStreak}
              </p>
              <p className="font-medium md:text-[14px] text-[12px] text-[#212529] flex justify-end items-end">
                Current Streak
              </p>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <p className="md:text-[24px] text-[20px] font-semibold flex justify-start items-start">
                {maxStreak}
              </p>
              <p className="font-medium md:text-[14px] text-[12px] text-[#212529] flex justify-end items-end">
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
