import { describe, expect, test } from "vitest";
import { Tetris } from "../src/Tetris";

describe("Tetris", () => {
    test("se puede crear un Tetris", () => {
        expect(new Tetris()).toBeInstanceOf(Tetris);
    });
});
