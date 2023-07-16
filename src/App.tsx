import { useState } from "react";
import { createMinefield } from "./minefield/createMinefield";

function App() {
  const [minefield, setMinefield] = useState(
    createMinefield({ width: 10, height: 10, mines: 5 })
  );

  return (
    <div className="flex flex-col gap-1 items-center justify-center h-screen">
      {minefield.map((row) => (
        <div className="flex gap-1">
          {row.map((cell) => (
            <div className="flex justify-center items-center  w-12 h-12 border border-black">
              {cell.value === "Mine" ? "M" : cell.value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
