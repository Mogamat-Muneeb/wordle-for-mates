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
  }, [userUid]); // Re-run the effect when the user UID changes

  return (
    <div>
      <h1>Wordle With Friends</h1>
      <div>
        {/* Render other details from the gameData */}
        <p>Game ID: {gameData.id}</p>
        <p>Game Name: {gameData.name}</p>
        {/* Render results array */}
        <h2>Results</h2>
        <ul>
          {gameData.results &&
            gameData.results.map((result, index) => (
              <li key={index}>{result.result}</li>
            ))}
        </ul>
      </div>
      {/* Display games won, lost, and percentages */}
      <div>
        <h2>Games Won: {gamesWon}</h2>
        <h2>Games Lost: {gamesLost}</h2>
        <h2>Total Games: {totalGames}</h2>
        <h2>Win Percentage: {winPercentage}%</h2>
        <h2>Lose Percentage: {losePercentage}%</h2>
      </div>
    </div>
  );
};

export default WordleWithFriends;
