import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const WordleWithFriends = () => {
  const [user] = useAuthState(auth);

  const userUid = user?.uid;
  const [gameData, setGameData] = useState([]);
  const [gamesWon, setGamesWon] = useState(0);
  const [gamesLost, setGamesLost] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [winPercentage, setWinPercentage] = useState(0);
  const [losePercentage, setLosePercentage] = useState(0);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gamesRef = collection(db, "user-created-games");
        const querySnapshot = await getDocs(
          query(gamesRef, where("userId", "==", userUid))
        );

        if (!querySnapshot.empty) {
          const gameDocuments = querySnapshot.docs.map((doc) => doc.data());
          setGameData(gameDocuments);

          // Perform calculations for each game document if needed
          let totalWonCount = 0;
          let totalLostCount = 0;
          let totalGamesCount = 0;

          gameDocuments.forEach((gameDocument) => {
            const results = gameDocument.results || [];
            const wonCount = results.filter(
              (result) => result.result === "win"
            ).length;
            const lostCount = results.filter(
              (result) => result.result === "lose"
            ).length;

            totalWonCount += wonCount;
            totalLostCount += lostCount;
            totalGamesCount += results.length;
          });

          setGamesWon(totalWonCount);
          setGamesLost(totalLostCount);

          // Calculate total games
          setTotalGames(totalGamesCount);

          // Calculate win and lose percentages
          const winPercentageCalc =
            (totalWonCount / totalGamesCount) * 100 || 0;
          const losePercentageCalc =
            (totalLostCount / totalGamesCount) * 100 || 0;

          setWinPercentage(winPercentageCalc.toFixed(2));
          setLosePercentage(losePercentageCalc.toFixed(2));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userUid) {
      fetchGameData();
    }
  }, [userUid]);

  return (
    <div className="flex flex-col items-start justify-start">
      <div className="flex items-end justify-start gap-3 lg:gap-6">
        <div className="flex items-end justify-start gap-3 lg:gap-6">
          <div className="flex flex-col items-center justify-center ">
            <p className="md:text-[24px] text-[20px] font-semibold flex justify-start items-start">
              {gamesWon}
            </p>
            <p className="font-medium md:text-[14px] text-[12px] text-[#212529] flex justify-end items-end ">
              Games Won
            </p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <p className="md:text-[24px] text-[20px] font-semibold flex justify-start items-start">
              {gamesLost}
            </p>
            <p className="font-medium md:text-[14px] text-[12px] text-[#212529] flex justify-end items-end">
              Games Lost
            </p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <p className="md:text-[24px] text-[20px] font-semibold flex justify-start items-start">
              {totalGames}
            </p>
            <p className="font-medium md:text-[14px] text-[12px] text-[#212529] flex justify-end items-end">
              Total Games:
            </p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <p className="md:text-[24px] text-[20px] font-semibold flex justify-start items-start">
              {winPercentage}%
            </p>
            <p className="font-medium md:text-[14px] text-[12px] text-[#212529] flex justify-end items-end">
              Win Percentage:
            </p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <p className="md:text-[24px] text-[20px] font-semibold flex justify-start items-start">
              {losePercentage}%
            </p>
            <p className="font-medium md:text-[14px] text-[12px] text-[#212529] flex justify-end items-end">
              Lose Percentage:
            </p>
          </div>
        </div>
      </div>
      <div>
        <ul>
          {gameData.length > 0 ? (
            gameData.map((gameDocument, index) => {
              return (
                <React.Fragment key={index}>
                  <li>
                    {index + 1}.{" "}
                    {gameDocument?.results
                      ? gameDocument.results[0]?.result
                      : ""}
                  </li>
                </React.Fragment>
              );
            })
          ) : (
            <li>No results available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default WordleWithFriends;
