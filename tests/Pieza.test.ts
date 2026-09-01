import { describe, expect, it } from "vitest";
import { Pieza } from "../src/piezas/Pieza";
import { PiezaCuadrado } from "../src/piezas/PiezaCuadrado";
import { PiezaL } from "../src/piezas/PiezaL";
import { PiezaPalo } from "../src/piezas/PiezaPalo";
import { PiezaPerro } from "../src/piezas/PiezaPerro";
import { PiezaT } from "../src/piezas/PiezaT";

type CasoPieza = {
    nombre: string;
    crear: () => Pieza;
    formaInicial: number[][];
    formaDerecha: number[][];
    formaIzquierda: number[][];
};

const casosPiezas: CasoPieza[] = [
    {
        nombre: "T",
        crear: () => new PiezaT(),
        formaInicial: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        formaDerecha: [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ],
        formaIzquierda: [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    },
    {
        nombre: "Cuadrado",
        crear: () => new PiezaCuadrado(),
        formaInicial: [
            [1, 1],
            [1, 1]
        ],
        formaDerecha: [
            [1, 1],
            [1, 1]
        ],
        formaIzquierda: [
            [1, 1],
            [1, 1]
        ]
    },
    {
        nombre: "Palo",
        crear: () => new PiezaPalo(),
        formaInicial: [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        formaDerecha: [
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 0, 0, 1]
        ],
        formaIzquierda: [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0]
        ]
    },
    {
        nombre: "L izquierda",
        crear: () => new PiezaL("izquierda"),
        formaInicial: [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 0]
        ],
        formaDerecha: [
            [1, 1, 1],
            [1, 0, 0],
            [0, 0, 0]
        ],
        formaIzquierda: [
            [0, 0, 0],
            [0, 0, 1],
            [1, 1, 1]
        ]
    },
    {
        nombre: "L derecha",
        crear: () => new PiezaL("derecha"),
        formaInicial: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ],
        formaDerecha: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        formaIzquierda: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1]
        ]
    },
    {
        nombre: "Perro izquierda",
        crear: () => new PiezaPerro("izquierda"),
        formaInicial: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        formaDerecha: [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ],
        formaIzquierda: [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    },
    {
        nombre: "Perro derecha",
        crear: () => new PiezaPerro("derecha"),
        formaInicial: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        formaDerecha: [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
        ],
        formaIzquierda: [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]
        ]
    }
];

function contarBloques(forma: number[][]): number {
    return forma.flat().filter(celda => celda === 1).length;
}

describe.each(casosPiezas)("Pieza $nombre", ({ nombre, crear, formaInicial, formaDerecha, formaIzquierda }) => {
    it("se crea con el nombre, la forma y la posición inicial correctos", () => {
        const pieza = crear();

        expect(pieza.nombre).toBe(nombre);
        expect(pieza.forma).toEqual(formaInicial);
        expect(pieza.fila).toBe(0);
        expect(pieza.columna).toBe(3);
        expect(contarBloques(pieza.forma)).toBe(4);
    });

    it("rota correctamente a la derecha sin cambiar de posición", () => {
        const pieza = crear();

        pieza.rotarDerecha();

        expect(pieza.forma).toEqual(formaDerecha);
        expect(pieza.fila).toBe(0);
        expect(pieza.columna).toBe(3);
        expect(contarBloques(pieza.forma)).toBe(4);
    });

    it("rota correctamente a la izquierda sin cambiar de posición", () => {
        const pieza = crear();

        pieza.rotarIzquierda();

        expect(pieza.forma).toEqual(formaIzquierda);
        expect(pieza.fila).toBe(0);
        expect(pieza.columna).toBe(3);
        expect(contarBloques(pieza.forma)).toBe(4);
    });

    it("recupera su forma inicial después de cuatro rotaciones", () => {
        const pieza = crear();
        const formaOriginal = pieza.forma.map(fila => [...fila]);

        for (let rotacion = 0; rotacion < 4; rotacion++) {
            pieza.rotarDerecha();
        }

        expect(pieza.forma).toEqual(formaOriginal);
    });

    it("recupera su forma inicial después de cuatro rotaciones a la izquierda", () => {
        const pieza = crear();
        const formaOriginal = pieza.forma.map(fila => [...fila]);

        for (let rotacion = 0; rotacion < 4; rotacion++) {
            pieza.rotarIzquierda();
        }

        expect(pieza.forma).toEqual(formaOriginal);
    });

    it("recupera su forma inicial al rotar a derecha y luego a izquierda", () => {
        const pieza = crear();
        const formaOriginal = pieza.forma.map(fila => [...fila]);

        pieza.rotarDerecha();
        pieza.rotarIzquierda();

        expect(pieza.forma).toEqual(formaOriginal);
    });

    it("puede ubicarse en una posición indicada por el tablero", () => {
        const pieza = crear();

        pieza.posicionar(5, 2);

        expect(pieza.columna).toBe(5);
        expect(pieza.fila).toBe(2);
    });
});
