import { describe, it, expect, test } from "vitest";
import { Tablero } from "../src/Tablero";
import { PiezaCuadrado } from "../src/piezas/PiezaCuadrado";
import { PiezaPalo } from "../src/piezas/PiezaPalo";

describe("Tablero", () => {
    it("crea una matriz vacía de 10 por 20 y devuelve una copia", () => {
        const tablero = new Tablero();
        expect(tablero.celdas).toEqual(Array.from({ length: 20 }, () => Array(10).fill(0)));
        const copia = tablero.celdas;
        copia[0][0] = 1;
        expect(tablero.celdas[0][0]).toBe(0);
    });

    it("fija cuatro bloques y rechaza una pieza superpuesta sin modificar nada", () => {
        const tablero = new Tablero();
        const pieza = new PiezaCuadrado();
        expect(tablero.fijarPieza(pieza)).toBe(true);
        expect(tablero.celdas.slice(0, 2).map(fila => fila.slice(3, 5))).toEqual([[1, 1], [1, 1]]);
        expect(tablero.celdas.flat().filter(celda => celda === 1)).toHaveLength(4);
        const anterior = tablero.celdas;
        expect(tablero.colisiona(pieza, 3, 0)).toBe(true);
        expect(tablero.fijarPieza(pieza)).toBe(false);
        expect(tablero.celdas).toEqual(anterior);
    });

    it.each([
        { columna: -1, fila: 0 },
        { columna: 0, fila: 19 },
        { columna: 0, fila: -1 }
    ])("rechaza fijar fuera del tablero en ($columna, $fila)", ({ columna, fila }) => {
        const tablero = new Tablero();
        const pieza = new PiezaCuadrado();
        pieza.posicionar(columna, fila);
        const anterior = tablero.celdas;
        expect(tablero.fijarPieza(pieza)).toBe(false);
        expect(tablero.celdas).toEqual(anterior);
    });

    it("detecta paredes y fondo, pero permite caer desde arriba", () => {
        const tablero = new Tablero();
        const pieza = new PiezaCuadrado();
        expect(tablero.colisiona(pieza, -1, 0)).toBe(true);
        expect(tablero.colisiona(pieza, 9, 0)).toBe(true);
        expect(tablero.colisiona(pieza, 0, 19)).toBe(true);
        expect(tablero.colisiona(pieza, 0, -1)).toBe(false);
        expect(tablero.colisiona(pieza, 0, 18)).toBe(false);
    });

    it("ubica arriba al azar entre las columnas libres", () => {
        const tablero = new Tablero();
        const pieza = new PiezaCuadrado();
        pieza.posicionar(0);
        tablero.fijarPieza(pieza);
        expect(tablero.ubicarPiezaArriba(pieza, () => 0)).toBe(true);
        expect([pieza.columna, pieza.fila]).toEqual([2, 0]);
        expect(tablero.ubicarPiezaArriba(pieza, () => 0.999999)).toBe(true);
        expect([pieza.columna, pieza.fila]).toEqual([8, 0]);
    });

    it("rechaza la aparición sin espacio y conserva la posición anterior", () => {
        const tablero = new Tablero(2, 2);
        const pieza = new PiezaCuadrado();
        pieza.posicionar(0);
        tablero.fijarPieza(pieza);
        const nueva = new PiezaCuadrado();
        expect(tablero.ubicarPiezaArriba(nueva, () => 0)).toBe(false);
        expect([nueva.columna, nueva.fila]).toEqual([3, 0]);
    });
});

describe("Limpieza de líneas", () => {
    test("conserva las filas incompletas sin aumentar el contador", () => {
        const tablero = new Tablero();
        const palo = new PiezaPalo();
        palo.posicionar(0, 19);
        tablero.fijarPieza(palo);
        const anterior = tablero.celdas;
        expect(tablero.limpiarLineas()).toBe(0);
        expect(tablero.celdas).toEqual(anterior);
        expect(tablero.cantidadLineas()).toBe(0);
    });

    test("elimina una línea, baja los bloques superiores y repone una fila vacía", () => {
        const tablero = new Tablero();
        for (const columna of [0, 4]) {
            const palo = new PiezaPalo();
            palo.posicionar(columna, 19);
            tablero.fijarPieza(palo);
        }
        const cuadrado = new PiezaCuadrado();
        cuadrado.posicionar(8, 18);
        tablero.fijarPieza(cuadrado);
        expect(tablero.limpiarLineas()).toBe(1);
        expect(tablero.cantidadLineas()).toBe(1);
        expect(tablero.celdas[19]).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 1, 1]);
        expect(tablero.celdas[0]).toEqual(Array(10).fill(0));
    });

    test("elimina dos líneas juntas y acumula el total en limpiezas sucesivas", () => {
        const tablero = new Tablero(2, 4);
        const pieza = new PiezaCuadrado();
        pieza.posicionar(0, 2);
        tablero.fijarPieza(pieza);
        expect(tablero.limpiarLineas()).toBe(2);
        tablero.fijarPieza(pieza);
        expect(tablero.limpiarLineas()).toBe(2);
        expect(tablero.cantidadLineas()).toBe(4);
        expect(tablero.celdas).toEqual([[0, 0], [0, 0], [0, 0], [0, 0]]);
    });
});
