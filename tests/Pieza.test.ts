import { describe, expect, it } from "vitest";
import { PiezaPalo } from "../src/piezas/PiezaPalo";
import { PiezaT } from "../src/piezas/PiezaT";

describe("Comportamiento compartido de las piezas", () => {
    it("rota a la derecha y recupera la forma tras cuatro giros", () => {
        const pieza = new PiezaPalo();
        const original = pieza.forma;
        pieza.rotarDerecha();
        expect(pieza.forma).toEqual([
            [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]
        ]);
        for (let giro = 0; giro < 3; giro++) pieza.rotarDerecha();
        expect(pieza.forma).toEqual(original);
    });

    it("rota a la izquierda y recupera la forma tras cuatro giros", () => {
        const pieza = new PiezaT();
        const original = pieza.forma;
        pieza.rotarIzquierda();
        expect(pieza.forma).toEqual([[0, 1, 0], [1, 1, 0], [0, 1, 0]]);
        for (let giro = 0; giro < 3; giro++) pieza.rotarIzquierda();
        expect(pieza.forma).toEqual(original);
    });

    it("permite posicionar y mover sin que la rotación cambie la posición", () => {
        const pieza = new PiezaT();
        expect([pieza.columna, pieza.fila]).toEqual([3, 0]);
        pieza.posicionar(5, 2);
        pieza.moverIzquierda();
        pieza.moverAbajo();
        expect([pieza.columna, pieza.fila]).toEqual([4, 3]);
        pieza.moverDerecha();
        pieza.rotarDerecha();
        expect([pieza.columna, pieza.fila]).toEqual([5, 3]);
        pieza.posicionar(1);
        expect([pieza.columna, pieza.fila]).toEqual([1, 0]);
    });
});
