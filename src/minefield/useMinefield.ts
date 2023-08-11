import { useEffect, useState } from "react";
import { createMinefield, getSurroundingCells } from "./createMinefield";

export function useMinefield() {
  const [minefield, setMinefield] = useState(
    createMinefield({ width: 2, height: 2, mines: 1 })
  );

  const [gameState, setGameState] = useState<"Playing" | "Won" | "Lost">(
    "Playing"
  );
  const [flagCount, setFlagCount] = useState(0);

  useEffect(() => {
    let isWon = true;
    let isLost = false;
    let flags = 0;
    minefield.flat().forEach((cell) => {
      if (cell.action !== "Revealed" && cell.value !== "Mine") {
        isWon = false;
      } else if (cell.action === "Revealed" && cell.value === "Mine") {
        isLost = true;
      }

      if (cell.action === "Flag") {
        flags++;
      }
    });

    setFlagCount(flags);
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

  return { minefield, gameState, flagCount, revealCell, flagCell };
}
