import { describe, expect, test } from "vitest";
import { Tablero } from "../src/Tablero";
import { PiezaCuadrado } from "../src/piezas/PiezaCuadrado";
import { PiezaPalo } from "../src/piezas/PiezaPalo";

function fijarPieza(tablero: Tablero, pieza: PiezaPalo | PiezaCuadrado): void {
    expect(tablero.fijarPieza(pieza)).toBe(true);
}

function completarUnaLineaInferior(tablero: Tablero): void {
    const paloIzquierdo = new PiezaPalo();
    paloIzquierdo.posicionar(0, 19);
    fijarPieza(tablero, paloIzquierdo);

    const paloCentral = new PiezaPalo();
    paloCentral.posicionar(4, 19);
    fijarPieza(tablero, paloCentral);

    const cuadradoDerecho = new PiezaCuadrado();
    cuadradoDerecho.posicionar(8, 18);
    fijarPieza(tablero, cuadradoDerecho);
}

function completarDosLineasInferiores(tablero: Tablero): void {
    for (let columna = 0; columna < 10; columna += 2) {
        const cuadrado = new PiezaCuadrado();
        cuadrado.posicionar(columna, 18);
        fijarPieza(tablero, cuadrado);
    }
}

describe("Limpieza de líneas del tablero", () => {
    test("no elimina una línea incompleta", () => {
        const tablero = new Tablero();
        const palo = new PiezaPalo();
        palo.posicionar(0, 19);
        fijarPieza(tablero, palo);
        const estadoAnterior = tablero.celdas;

        const lineasEliminadas = tablero.limpiarLineas();

        expect(lineasEliminadas).toBe(0);
        expect(tablero.celdas).toEqual(estadoAnterior);
        expect(tablero.cantidadLineas()).toBe(0);
    });

    test("elimina una línea completa y suma el contador", () => {
        const tablero = new Tablero();
        completarUnaLineaInferior(tablero);

        const lineasEliminadas = tablero.limpiarLineas();

        expect(lineasEliminadas).toBe(1);
        expect(tablero.cantidadLineas()).toBe(1);
    });

    test("baja las celdas superiores después de eliminar una línea", () => {
        const tablero = new Tablero();
        completarUnaLineaInferior(tablero);

        tablero.limpiarLineas();

        expect(tablero.celdas[19]).toEqual([
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1
        ]);
        expect(tablero.celdas[0]).toEqual(Array(10).fill(0));
    });

    test("elimina varias líneas completas en una sola operación", () => {
        const tablero = new Tablero();
        completarDosLineasInferiores(tablero);

        const lineasEliminadas = tablero.limpiarLineas();

        expect(lineasEliminadas).toBe(2);
        expect(tablero.cantidadLineas()).toBe(2);
        expect(tablero.celdas.flat().every(celda => celda === 0)).toBe(true);
    });

    test("mantiene las dimensiones originales después de limpiar líneas", () => {
        const tablero = new Tablero(10, 20);
        completarDosLineasInferiores(tablero);

        tablero.limpiarLineas();

        expect(tablero.celdas).toHaveLength(20);
        expect(tablero.celdas.every(fila => fila.length === 10)).toBe(true);
    });

    test("acumula las líneas eliminadas en operaciones sucesivas", () => {
        const tablero = new Tablero();
        completarDosLineasInferiores(tablero);
        expect(tablero.limpiarLineas()).toBe(2);

        completarDosLineasInferiores(tablero);
        expect(tablero.limpiarLineas()).toBe(2);

        expect(tablero.cantidadLineas()).toBe(4);
    });
});
