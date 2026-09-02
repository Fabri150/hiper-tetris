import { describe, expect, it } from "vitest";
import { generarPiezaAleatoria } from "../src/piezas/GeneradorPiezas";

const piezas = [
    { nombre: "T", forma: [[0, 1, 0], [1, 1, 1], [0, 0, 0]] },
    { nombre: "Cuadrado", forma: [[1, 1], [1, 1]] },
    { nombre: "Palo", forma: [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] },
    { nombre: "L izquierda", forma: [[1, 0, 0], [1, 0, 0], [1, 1, 0]] },
    { nombre: "L derecha", forma: [[0, 1, 0], [0, 1, 0], [1, 1, 0]] },
    { nombre: "Perro izquierda", forma: [[0, 1, 1], [1, 1, 0], [0, 0, 0]] },
    { nombre: "Perro derecha", forma: [[1, 1, 0], [0, 1, 1], [0, 0, 0]] }
];

describe("Generador de piezas", () => {
    it.each(piezas.map((pieza, indice) => ({ ...pieza, indice })))(
        "genera $nombre con su forma inicial",
        ({ nombre, forma, indice }) => {
            const valores = [indice / 7, 0];
            const pieza = generarPiezaAleatoria(() => valores.shift() ?? 0);
            expect(pieza.nombre).toBe(nombre);
            expect(pieza.forma).toEqual(forma);
        }
    );

    it.each([
        { valor: 0, forma: [[0, 1, 0], [1, 1, 1], [0, 0, 0]] },
        { valor: 0.25, forma: [[0, 1, 0], [0, 1, 1], [0, 1, 0]] },
        { valor: 0.5, forma: [[0, 0, 0], [1, 1, 1], [0, 1, 0]] },
        { valor: 0.75, forma: [[0, 1, 0], [1, 1, 0], [0, 1, 0]] }
    ])("aplica la orientación correspondiente a $valor", ({ valor, forma }) => {
        const valores = [0, valor];
        const pieza = generarPiezaAleatoria(() => valores.shift() ?? 0);
        expect(pieza.nombre).toBe("T");
        expect(pieza.forma).toEqual(forma);
    });
});
