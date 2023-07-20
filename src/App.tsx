import { useEffect, useState } from "react";
import {
  createMinefield,
  getSurroundingCells,
} from "./minefield/createMinefield";

function App() {
  const [minefield, setMinefield] = useState(
    createMinefield({ width: 10, height: 10, mines: 15 })
  );

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
      {minefield.map((row, y) => (
        <div className="flex gap-1">
          {row.map((cell, x) => (
            <div
              onClick={() => revealCell({ y, x })}
              onContextMenu={(e) => {
                e.preventDefault();
                flagCell({ y, x });
              }}
              className="flex justify-center items-center  w-12 h-12 border border-black"
            >
              {(cell.action === "Revealed" &&
                (cell.value === "Mine" ? "M" : cell.value)) ||
                (cell.action === "Flag" && "F")}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
