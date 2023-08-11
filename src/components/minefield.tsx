import { useMinefield } from "../minefield/useMinefield";

export function Minefield() {
  const { minesLeft, minefield, gameState, flagCell, revealCell } =
    useMinefield({ width: 5, height: 5, mines: 4 });
  return (
    <div className="flex flex-col gap-1 items-center justify-center h-screen">
      <p>Game state: {gameState}</p>
      <p>🚩 {minesLeft}</p>
      {minefield.map((row, y) => (
        <div className="flex gap-1" key={`row-${y}`}>
          {row.map((cell, x) => (
            <button
              key={`cell-${y}-${x}`}
              disabled={gameState !== "Playing"}
              onClick={() => revealCell({ y, x })}
              onContextMenu={(e) => {
                e.preventDefault();
                flagCell({ y, x });
              }}
              className="flex justify-center items-center  w-12 h-12 border border-black"
            >
              {(cell.action === "Revealed" &&
                (cell.value === "Mine" ? "💣" : cell.value)) ||
                (cell.action === "Flag" && "🚩")}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
