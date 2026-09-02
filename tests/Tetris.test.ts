import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { Tetris } from "../src/Tetris";

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
});

describe("Tetris", () => {
    test("crea la pieza en una columna aleatoria y expone copias del estado", () => {
        const valores = [0, 0, 0.999999];
        const tetris = new Tetris(() => valores.shift() ?? 0);
        expect(tetris.estado).toBe("no-iniciado");
        expect(tetris.estadoPiezaActual.nombre).toBe("T");
        expect(tetris.estadoPiezaActual.columna).toBe(7);
        expect(tetris.estadoPiezaActual.fila).toBe(0);
        const pieza = tetris.estadoPiezaActual;
        pieza.columna = 99;
        pieza.forma[0][0] = 99;
        const tablero = tetris.celdasTablero;
        tablero[0][0] = 99;
        expect(tetris.estadoPiezaActual.columna).toBe(7);
        expect(tetris.estadoPiezaActual.forma[0][0]).toBe(0);
        expect(tetris.celdasTablero[0][0]).toBe(0);
    });

    test("permite avances manuales y controlar la caída automática", () => {
        const tetris = new Tetris(() => 0);
        vi.advanceTimersByTime(2000);
        expect(tetris.estado).toBe("no-iniciado");
        expect(tetris.estadoPiezaActual.fila).toBe(0);
        tetris.tick();
        expect(tetris.estado).toBe("jugando");
        expect(tetris.estadoPiezaActual.fila).toBe(1);
        expect(vi.getTimerCount()).toBe(0);
        vi.advanceTimersByTime(1000);
        expect(tetris.estadoPiezaActual.fila).toBe(1);
        tetris.iniciar();
        expect(tetris.estado).toBe("jugando");
        vi.advanceTimersByTime(1000);
        expect(tetris.estadoPiezaActual.fila).toBe(2);
        tetris.detener();
        vi.advanceTimersByTime(2000);
        expect(tetris.estadoPiezaActual.fila).toBe(2);
        tetris.iniciar();
        vi.advanceTimersByTime(1000);
        expect(tetris.estadoPiezaActual.fila).toBe(3);
    });
});

describe("Movimientos de Tetris", () => {
    test("mueve a ambos lados respetando las paredes", () => {
        const tetris = new Tetris(() => 0);
        tetris.moverIzquierda();
        expect(tetris.estadoPiezaActual.columna).toBe(0);
        tetris.moverDerecha();
        expect(tetris.estadoPiezaActual.columna).toBe(1);
        tetris.moverIzquierda();
        expect(tetris.estadoPiezaActual.columna).toBe(0);
        for (let paso = 0; paso < 20; paso++) tetris.moverDerecha();
        expect(tetris.estadoPiezaActual.columna).toBe(7);
    });

    test("rota en ambos sentidos cuando hay espacio", () => {
        const tetris = new Tetris(() => 0);
        const original = tetris.estadoPiezaActual.forma;
        tetris.rotarDerecha();
        expect(tetris.estadoPiezaActual.forma).toEqual([[0, 1, 0], [0, 1, 1], [0, 1, 0]]);
        tetris.rotarIzquierda();
        expect(tetris.estadoPiezaActual.forma).toEqual(original);
        tetris.rotarIzquierda();
        expect(tetris.estadoPiezaActual.forma).toEqual([[0, 1, 0], [1, 1, 0], [0, 1, 0]]);
    });

    test("deshace giros a ambos lados si atraviesan la pared", () => {
        const tetris = new Tetris(() => 0);
        tetris.rotarDerecha();
        tetris.moverIzquierda();
        const anterior = tetris.estadoPiezaActual;
        expect(anterior.columna).toBe(-1);
        tetris.rotarDerecha();
        expect(tetris.estadoPiezaActual).toEqual(anterior);
        tetris.rotarIzquierda();
        expect(tetris.estadoPiezaActual).toEqual(anterior);
    });

    test("deshace una rotación que choca con bloques fijados", () => {
        const tetris = new Tetris(() => 0);
        tetris.iniciar();
        vi.advanceTimersByTime(35000);
        const anterior = tetris.estadoPiezaActual;
        expect(anterior.fila).toBe(16);
        tetris.rotarDerecha();
        expect(tetris.estadoPiezaActual).toEqual(anterior);
    });

    test("fija la pieza bloqueada y los ticks siguientes mueven solamente la nueva", () => {
        const tetris = new Tetris(() => 0);
        tetris.iniciar();
        vi.advanceTimersByTime(1000);
        expect(tetris.estado).toBe("jugando");
        expect(tetris.estadoPiezaActual.fila).toBe(1);
        vi.advanceTimersByTime(18000);
        expect(tetris.celdasTablero[18][1]).toBe(1);
        expect(tetris.celdasTablero[19].slice(0, 3)).toEqual([1, 1, 1]);
        expect(tetris.estadoPiezaActual.fila).toBe(0);
        const tablero = tetris.celdasTablero;
        vi.advanceTimersByTime(1000);
        expect(tetris.estadoPiezaActual.fila).toBe(1);
        expect(tetris.celdasTablero).toEqual(tablero);
    });
});

describe("Fin de partida", () => {
    test("termina sin espacio, detiene el reloj e impide nuevas acciones", () => {
        const tetris = new Tetris(() => 0);
        tetris.iniciar();
        vi.advanceTimersByTime(1000000);
        expect(tetris.estado).toBe("terminado");
        expect(vi.getTimerCount()).toBe(0);
        const pieza = tetris.estadoPiezaActual;
        const tablero = tetris.celdasTablero;
        tetris.iniciar();
        tetris.tick();
        tetris.moverIzquierda();
        tetris.moverDerecha();
        tetris.rotarIzquierda();
        tetris.rotarDerecha();
        vi.advanceTimersByTime(5000);
        expect(tetris.estado).toBe("terminado");
        expect(vi.getTimerCount()).toBe(0);
        expect(tetris.estadoPiezaActual).toEqual(pieza);
        expect(tetris.celdasTablero).toEqual(tablero);
    });
});

function crearPartida(objetivo: number): Tetris {
    // Dos palos y un cuadrado completan la fila inferior tras 59 ticks.
    const valores = [2 / 7, 0, 0, 2 / 7, 0, 4 / 7, 1 / 7, 0, 0.999999, 0, 0, 0];
    const tetris = new Tetris(() => valores.shift() ?? 0, objetivo);
    tetris.iniciar();
    vi.advanceTimersByTime(59000);
    return tetris;
}

describe("Objetivo de líneas", () => {
    test("termina al alcanzar el objetivo y detiene el reloj", () => {
        const tetris = crearPartida(1);
        expect(tetris.cantidadLineas).toBe(1);
        expect(tetris.estado).toBe("terminado");
        expect(vi.getTimerCount()).toBe(0);
        const pieza = tetris.estadoPiezaActual;
        tetris.tick();
        vi.advanceTimersByTime(5000);
        expect(tetris.estadoPiezaActual).toEqual(pieza);
    });

    test("limpia la fila completa y continúa mientras no alcance el objetivo", () => {
        const tetris = crearPartida(2);
        expect(tetris.cantidadLineas).toBe(1);
        expect(tetris.estado).toBe("jugando");
        expect(tetris.celdasTablero[19]).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 1, 1]);
        expect(vi.getTimerCount()).toBe(1);
    });
});
