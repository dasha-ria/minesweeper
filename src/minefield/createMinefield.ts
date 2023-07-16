type CreateMinefield = {
  width: number;
  height: number;
  mines: number;
};

type Cell = {
  value: string;
  action: "Reveal" | "Flag" | null;
};

type Minefield = Array<Array<Cell>>;

function randomiseMineLocations({ width, height, mines }: CreateMinefield) {
  const potentialLocations = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      potentialLocations.push({ y, x });
    }
  }

  return shuffle(potentialLocations).slice(0, mines);
}

function shuffle<T>(array: Array<T>) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function getSurroundingCells({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  // prettier-ignore
  const surroundingCoordinates = [
    {y: y-1, x: x-1}, {y: y-1, x}, {y: y-1, x: x+1},
    {y, x: x-1},                   {y, x: x+1},
    {y: y+1, x: x-1}, {y: y+1, x}, {y: y+1, x: x+1}
  ]

  return surroundingCoordinates.filter(({ y, x }) => {
    if (y >= 0 && y < height && x >= 0 && x < width) {
      return true;
    }
  });
}

export function createMinefield({ width, height, mines }: CreateMinefield) {
  const arr = new Array(height);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(width).fill({ value: "0" });
  }

  //   const mineLocations = [
  //     { x: 0, y: 0 },
  //     { x: 1, y: 0 },
  //   ];

  const mineLocations = randomiseMineLocations({ width, height, mines });

  mineLocations.forEach(({ x, y }) => {
    arr[y][x] = { value: "Mine", action: null };
  });

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (arr[y][x].value !== "Mine") {
        arr[y][x] = {
          value: getSurroundingCells({ y, x, width, height })
            .filter((coords) => arr[coords.y][coords.x].value === "Mine")
            .length.toString(),
        };
      }
    }
  }

  return arr as Minefield;
}
