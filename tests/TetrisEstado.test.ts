import { afterEach, describe, expect, test, vi } from "vitest";
import { Tetris } from "../src/Tetris";

function avanzarHastaTerminar(tetris: Tetris): void {
    for (let tick = 0; tick < 1000 && tetris.estado !== "terminado"; tick++) {
        tetris.tick();
    }

    expect(tetris.estado).toBe("terminado");
}

describe("Estado de Tetris", () => {
    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    test("el estado inicial es no-iniciado", () => {
        const tetris = new Tetris(() => 0);

        expect(tetris.estado).toBe("no-iniciado");
    });

    test("iniciar cambia el estado a jugando", () => {
        vi.useFakeTimers();
        const tetris = new Tetris(() => 0);

        tetris.iniciar();

        expect(tetris.estado).toBe("jugando");
        tetris.detener();
    });

    test("un tick manual cambia el estado a jugando", () => {
        const tetris = new Tetris(() => 0);

        tetris.tick();

        expect(tetris.estado).toBe("jugando");
    });

    test("termina cuando no puede ubicar una pieza nueva", () => {
        const tetris = new Tetris(() => 0);

        avanzarHastaTerminar(tetris);
    });

    test("un tick no cambia la pieza ni el tablero despues de terminar", () => {
        const tetris = new Tetris(() => 0);
        avanzarHastaTerminar(tetris);
        const piezaAnterior = tetris.estadoPiezaActual;
        const tableroAnterior = tetris.celdasTablero;

        tetris.tick();

        expect(tetris.estadoPiezaActual).toEqual(piezaAnterior);
        expect(tetris.celdasTablero).toEqual(tableroAnterior);
    });

    test("los movimientos y rotaciones no cambian la pieza terminada", () => {
        const tetris = new Tetris(() => 0);
        avanzarHastaTerminar(tetris);
        const piezaAnterior = tetris.estadoPiezaActual;

        tetris.moverIzquierda();
        tetris.moverDerecha();
        tetris.rotarIzquierda();
        tetris.rotarDerecha();

        expect(tetris.estadoPiezaActual).toEqual(piezaAnterior);
    });

    test("el reloj queda detenido al terminar", () => {
        vi.useFakeTimers();
        const tetris = new Tetris(() => 0);
        tetris.iniciar();
        avanzarHastaTerminar(tetris);
        const piezaAnterior = tetris.estadoPiezaActual;
        const tableroAnterior = tetris.celdasTablero;

        tetris.iniciar();
        vi.advanceTimersByTime(5000);

        expect(tetris.estadoPiezaActual).toEqual(piezaAnterior);
        expect(tetris.celdasTablero).toEqual(tableroAnterior);
    });
});
