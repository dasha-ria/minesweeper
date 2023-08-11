import { useMinefield } from "./minefield/useMinefield";

function App() {
  const mines = 1;
  const { minefield, gameState, flagCount, flagCell, revealCell } =
    useMinefield();

  return (
    <div className="flex flex-col gap-1 items-center justify-center h-screen">
      <p>Game state: {gameState}</p>
      <p>🚩 {mines - flagCount}</p>
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

export default App;
