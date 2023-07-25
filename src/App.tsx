import { useEffect, useState } from "react";
import {
  createMinefield,
  getSurroundingCells,
} from "./minefield/createMinefield";

function App() {
  const [minefield, setMinefield] = useState(
    createMinefield({ width: 2, height: 2, mines: 1 })
  );

  const [gameState, setGameState] = useState<"Playing" | "Won" | "Lost">(
    "Playing"
  );

  useEffect(() => {
    let isWon = true;
    let isLost = false;
    minefield.flat().forEach((cell) => {
      if (cell.action !== "Revealed" && cell.value !== "Mine") {
        isWon = false;
      } else if (cell.action === "Revealed" && cell.value === "Mine") {
        isLost = true;
      }
    });
    if (isLost) {
      setGameState("Lost");
    } else if (isWon) {
      setGameState("Won");
    }
  }, [minefield]);

  function revealCell({ y, x }: { y: number; x: number }) {
    setMinefield((prev) => {
      const newMinefield = structuredClone(prev);
      const cell = newMinefield[y][x];
      cell.action = "Revealed";

      if (cell.value === "0") {
        const surroundingCoordinates = getSurroundingCells({
          y,
          x,
          width: minefield[0].length,
          height: minefield.length,
        });

        surroundingCoordinates.forEach((coords) => {
          if (newMinefield[coords.y][coords.x].action !== "Revealed") {
            revealCell({ y: coords.y, x: coords.x });
          }
        });
      }

      return newMinefield;
    });

    //    setMinefield(newMinefield);
  }

  function flagCell({ y, x }: { y: number; x: number }) {
    const newMinefield = structuredClone(minefield);
    const cell = newMinefield[y][x];

    if (cell.action === "Flag") {
      cell.action = null;
    } else if (cell.action === null) {
      cell.action = "Flag";
    }
    setMinefield(newMinefield);
  }

  return (
    <div className="flex flex-col gap-1 items-center justify-center h-screen">
      <p>Game state: {gameState}</p>
      {minefield.map((row, y) => (
        <div className="flex gap-1">
          {row.map((cell, x) => (
            <button
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
