import { useSelector } from "react-redux";

interface GameState {
  game: {
    winner: "RED" | "YELLOW" | "DRAW" | null;
    currentPlayer: "RED" | "YELLOW";
  };
}

const BoardFooter = () => {
  const winner = useSelector((state: GameState) => state.game.winner);
  const currentPlayer = useSelector(
    (state: GameState) => state.game.currentPlayer
  );

  if (winner === "YELLOW" || currentPlayer === "YELLOW") {
    // yellow
  } else if (winner === "RED" || currentPlayer === "RED") {
    // red
  } else {
    // purple
  }

  return (
    <footer
      className={`h-1/4 w-full absolute bottom-0 left-0 rounded-t-[20px] ${
        winner === "DRAW"
          ? "bg-darkPurple"
          : (winner || currentPlayer) === "RED"
          ? "bg-red"
          : "bg-yellow"
      }`}
    ></footer>
  );
};

export default BoardFooter;

// className={`absolute h-1/4 bottom-0 left-0 rounded-t-[20px] w-full bg-darkPurple ${winner === 'DRAW' ? 'bg-darkPurple' : winner === 'RED' || currentPlayer  === 'RED' ? 'bg-red' : winner || currentPlayer === 'YELLOW' : 'bg-yellow'}
