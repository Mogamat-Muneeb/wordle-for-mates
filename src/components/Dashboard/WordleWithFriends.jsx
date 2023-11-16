import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const WordleWithFriends = () => {
  const [user] = useAuthState(auth);

  const userUid = user?.uid;
  const [gameData, setGameData] = useState({});
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
          const gameDocument = querySnapshot.docs[0].data();
          setGameData(gameDocument);

          // Calculate games won and lost
          const results = gameDocument.results || [];
          const wonCount = results.filter(
            (result) => result.result === "win"
          ).length;
          const lostCount = results.filter(
            (result) => result.result === "lose"
          ).length;

          setGamesWon(wonCount);
          setGamesLost(lostCount);

          // Calculate total games
          const totalGamesCount = results.length;
          setTotalGames(totalGamesCount);

          // Calculate win and lose percentages
          const winPercentageCalc = (wonCount / totalGamesCount) * 100 || 0;
          const losePercentageCalc = (lostCount / totalGamesCount) * 100 || 0;

          setWinPercentage(winPercentageCalc.toFixed(2));
          setLosePercentage(losePercentageCalc.toFixed(2));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGameData();
  }, [userUid]);

  return (
    <div className="flex flex-col items-start justify-start">
      <div className="flex items-end justify-start gap-3 lg:gap-6">
        <div className="flex flex-col items-center justify-center ">
          <p className="text-[24px] font-semibold flex justify-start items-start">
            {gamesWon}
          </p>
          <p className="font-medium text-[14px] text-[#212529] flex justify-end items-end ">
            Games Won
          </p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p className="text-[24px] font-semibold flex justify-start items-start">
            {gamesLost}
          </p>
          <p className="font-medium text-[14px] text-[#212529] flex justify-end items-end">
            Games Lost
          </p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p className="text-[24px] font-semibold flex justify-start items-start">
            {totalGames}
          </p>
          <p className="font-medium text-[14px] text-[#212529] flex justify-end items-end">
            Total Games:
          </p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p className="text-[24px] font-semibold flex justify-start items-start">
            {winPercentage}%
          </p>
          <p className="font-medium text-[14px] text-[#212529] flex justify-end items-end">
            Win Percentage:
          </p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p className="text-[24px] font-semibold flex justify-start items-start">
            {losePercentage}%
          </p>
          <p className="font-medium text-[14px] text-[#212529] flex justify-end items-end">
            Lose Percentage:
          </p>
        </div>
      </div>
      <div>
        <ul>
          {gameData.results &&
            gameData.results.map((result, index) => (
              <li key={index}>{result.result} ss</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default WordleWithFriends;
