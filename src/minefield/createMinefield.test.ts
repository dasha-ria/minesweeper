import { test, expect } from "vitest";
import { createMinefield } from "./createMinefield";

const minefield = createMinefield({ width: 3, height: 5, mines: 2 });

test("has correct width", () => {
  expect(minefield[0].length).toBe(3);
});

test("has correct height", () => {
  expect(minefield.length).toBe(5);
});

test("has correct amount of mines", () => {
  expect(minefield.flat().filter((cell) => cell.value === "Mine").length).toBe(
    2
  );
});
