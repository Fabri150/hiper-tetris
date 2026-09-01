import { describe, expect, test } from "vitest";
import { Tetris } from "../src/Tetris";

function aleatoriedadControlada(...valores: number[]): () => number {
    return () => valores.shift() ?? 0;
}

describe("Movimientos de Tetris", () => {
    test("la primera pieza se genera y se ubica en una columna aleatoria válida", () => {
        const random = aleatoriedadControlada(0, 0, 0.999999);

        const tetris = new Tetris(random);

        expect(tetris.estadoPiezaActual.nombre).toBe("T");
        expect(tetris.estadoPiezaActual.fila).toBe(0);
        expect(tetris.estadoPiezaActual.columna).toBe(7);
    });

    test("puede mover la pieza actual a izquierda y derecha", () => {
        const tetris = new Tetris(() => 0);

        tetris.moverDerecha();
        expect(tetris.estadoPiezaActual.columna).toBe(1);

        tetris.moverIzquierda();
        expect(tetris.estadoPiezaActual.columna).toBe(0);
    });

    test("no atraviesa la pared izquierda", () => {
        const tetris = new Tetris(() => 0);

        tetris.moverIzquierda();

        expect(tetris.estadoPiezaActual.columna).toBe(0);
    });

    test("no atraviesa la pared derecha", () => {
        const tetris = new Tetris(() => 0);

        for (let movimiento = 0; movimiento < 20; movimiento++) {
            tetris.moverDerecha();
        }

        expect(tetris.estadoPiezaActual.columna).toBe(7);
    });

    test("rota la pieza actual a la derecha cuando hay espacio", () => {
        const tetris = new Tetris(() => 0);

        tetris.rotarDerecha();

        expect(tetris.estadoPiezaActual.forma).toEqual([
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ]);
    });

    test("rota la pieza actual a la izquierda cuando hay espacio", () => {
        const tetris = new Tetris(() => 0);

        tetris.rotarIzquierda();

        expect(tetris.estadoPiezaActual.forma).toEqual([
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]);
    });

    test("deshace una rotación que atravesaría la pared", () => {
        const tetris = new Tetris(() => 0);
        tetris.rotarDerecha();
        tetris.moverIzquierda();
        const formaAnterior = tetris.estadoPiezaActual.forma;

        tetris.rotarDerecha();

        expect(tetris.estadoPiezaActual.columna).toBe(-1);
        expect(tetris.estadoPiezaActual.forma).toEqual(formaAnterior);
    });

    test("deshace una rotación que chocaría con una pieza fijada", () => {
        const tetris = new Tetris(() => 0);

        for (let tick = 0; tick < 19; tick++) {
            tetris.tick();
        }
        for (let tick = 0; tick < 16; tick++) {
            tetris.tick();
        }
        const formaAnterior = tetris.estadoPiezaActual.forma;

        tetris.rotarDerecha();

        expect(tetris.estadoPiezaActual.fila).toBe(16);
        expect(tetris.estadoPiezaActual.forma).toEqual(formaAnterior);
    });

    test("fija una pieza bloqueada y crea otra arriba", () => {
        const tetris = new Tetris(() => 0);

        for (let tick = 0; tick < 19; tick++) {
            tetris.tick();
        }

        expect(tetris.celdasTablero[18][1]).toBe(1);
        expect(tetris.celdasTablero[19].slice(0, 3)).toEqual([1, 1, 1]);
        expect(tetris.estadoPiezaActual.nombre).toBe("T");
        expect(tetris.estadoPiezaActual.fila).toBe(0);
        expect(tetris.estadoPiezaActual.columna).toBe(0);
    });

    test("un tick mueve solamente la pieza actual y no las piezas fijadas", () => {
        const tetris = new Tetris(() => 0);

        for (let tick = 0; tick < 19; tick++) {
            tetris.tick();
        }
        const tableroConPiezaFijada = tetris.celdasTablero;

        tetris.tick();

        expect(tetris.estadoPiezaActual.fila).toBe(1);
        expect(tetris.celdasTablero).toEqual(tableroConPiezaFijada);
    });

    test("limpia y cuenta una línea cuando se completa durante el juego", () => {
        const random = aleatoriedadControlada(
            2 / 7, 0, 0,
            2 / 7, 0, 4 / 7,
            1 / 7, 0, 0.999999,
            0, 0, 0
        );
        const tetris = new Tetris(random);

        for (let tick = 0; tick < 59; tick++) {
            tetris.tick();
        }

        expect(tetris.cantidadLineas).toBe(1);
        expect(tetris.celdasTablero[19]).toEqual([
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1
        ]);
    });
});
