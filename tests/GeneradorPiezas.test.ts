import { describe, expect, it } from "vitest";
import { generarPiezaAleatoria } from "../src/piezas/GeneradorPiezas";

const casosGenerador = [
    { valorAleatorio: 0 / 7, nombreEsperado: "T" },
    { valorAleatorio: 1 / 7, nombreEsperado: "Cuadrado" },
    { valorAleatorio: 2 / 7, nombreEsperado: "Palo" },
    { valorAleatorio: 3 / 7, nombreEsperado: "L izquierda" },
    { valorAleatorio: 4 / 7, nombreEsperado: "L derecha" },
    { valorAleatorio: 5 / 7, nombreEsperado: "Perro izquierda" },
    { valorAleatorio: 6 / 7, nombreEsperado: "Perro derecha" }
];

describe("Generador de piezas", () => {
    it.each(casosGenerador)(
        "genera $nombreEsperado cuando el valor aleatorio es $valorAleatorio",
        ({ valorAleatorio, nombreEsperado }) => {
            const pieza = generarPiezaAleatoria(() => valorAleatorio);

            expect(pieza.nombre).toBe(nombreEsperado);
            expect(pieza.forma.flat().filter(celda => celda === 1)).toHaveLength(4);
        }
    );

    it.each([
        {
            valorRotacion: 0,
            formaEsperada: [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ]
        },
        {
            valorRotacion: 1 / 4,
            formaEsperada: [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
            ]
        },
        {
            valorRotacion: 2 / 4,
            formaEsperada: [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ]
        },
        {
            valorRotacion: 3 / 4,
            formaEsperada: [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0]
            ]
        }
    ])(
        "genera una pieza con la orientación aleatoria correspondiente a $valorRotacion",
        ({ valorRotacion, formaEsperada }) => {
            const valoresAleatorios = [0, valorRotacion];
            const pieza = generarPiezaAleatoria(() => valoresAleatorios.shift() ?? 0);

            expect(pieza.nombre).toBe("T");
            expect(pieza.forma).toEqual(formaEsperada);
        }
    );
});
