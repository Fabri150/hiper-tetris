import { describe, expect, test, vi } from "vitest";
import { Tetris } from "../src/Tetris";

describe("Tetris", () => {
    test("se puede crear un Tetris", () => {
        expect(new Tetris()).toBeInstanceOf(Tetris);
    });

    test("un tick baja la pieza actual exactamente una fila", () => {
        const tetris = new Tetris();
        const filaInicial = tetris.estadoPiezaActual.fila;

        tetris.tick();

        expect(tetris.estadoPiezaActual.fila).toBe(filaInicial + 1);
    });

    test("detener impide nuevos ticks automaticos", () => {
        vi.useFakeTimers();
        const tetris = new Tetris();
        const filaInicial = tetris.estadoPiezaActual.fila;

        tetris.iniciar();
        tetris.detener();
        vi.advanceTimersByTime(2000);

        expect(tetris.estadoPiezaActual.fila).toBe(filaInicial);
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    test("la fotografia de la pieza no permite modificar la pieza interna", () => {
        const tetris = new Tetris();
        const fotografia = tetris.estadoPiezaActual;

        fotografia.columna = 99;
        fotografia.forma[0][0] = 99;

        expect(tetris.estadoPiezaActual.columna).not.toBe(99);
        expect(tetris.estadoPiezaActual.forma[0][0]).not.toBe(99);
    });

    test("la fotografia del tablero no permite modificar el tablero interno", () => {
        const tetris = new Tetris();
        const fotografia = tetris.celdasTablero;

        fotografia[0][0] = 1;

        expect(tetris.celdasTablero[0][0]).toBe(0);
    });
});
