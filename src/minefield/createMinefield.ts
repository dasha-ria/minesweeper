type CreateMinefield = {
  width: number;
  height: number;
  mines: number;
};

function randomiseMineLocations({ width, height, mines }: CreateMinefield) {
  const randomWidth = Math.floor(Math.random() * (width - 1));
  const randomHeight = Math.floor(Math.random() * (height - 1));

  let potentialLocations = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      potentialLocations.push({ y, x });
    }
  }

  potentialLocations = shuffle(potentialLocations);
  const mineLocations = potentialLocations.slice(0, mines);

  return mineLocations;
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

export function createMinefield({ width, height, mines }: CreateMinefield) {
  const arr = new Array(height);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(width);
  }

  //   const mineLocations = [
  //     { x: 0, y: 0 },
  //     { x: 1, y: 0 },
  //   ];

  const mineLocations = randomiseMineLocations({ width, height, mines });

  mineLocations.forEach(({ x, y }) => {
    arr[y][x] = { value: "Mine" };
  });

  return arr;
}
