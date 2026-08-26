import { describe, expect, test } from "vitest";
import { Tetris } from "../src/Tetris";

describe("Tetris", () => {
    test("Existe la clase tetris con pieza cuadrada", () => {
    const t = new Tetris("Cuadrado");
    expect(t.piece).toBe("Cuadrado");
    })
})