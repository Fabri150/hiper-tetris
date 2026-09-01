import { describe, it, expect } from 'vitest';
import { Tablero } from '../src/Tablero';
import { PiezaCuadrado } from '../src/piezas/PiezaCuadrado';

describe('Tablero', () => {
    it('debe crear un tablero con las dimensiones correctas', () => {
        const tablero = new Tablero(10, 20);
        expect(tablero.celdas).toHaveLength(20);
        expect(tablero.celdas[0]).toHaveLength(10);
    });
    it('debe inicializar todas las celdas en 0', () => {
        const tablero = new Tablero();
        const matriz = tablero.celdas;
        matriz.forEach(fila => {fila.forEach(celda => {expect(celda).toBe(0);});});
    });

    it('debe fijar una pieza completa', () => {
        const tablero = new Tablero();
        const pieza = new PiezaCuadrado();

        expect(tablero.fijarPieza(pieza)).toBe(true);
        expect(tablero.celdas[0][3]).toBe(1);
        expect(tablero.celdas[0][4]).toBe(1);
        expect(tablero.celdas[1][3]).toBe(1);
        expect(tablero.celdas[1][4]).toBe(1);
    });

    it('debe detectar una colision con la pared izquierda', () => {
        const tablero = new Tablero();
        const pieza = new PiezaCuadrado();

        expect(tablero.colisiona(pieza, -1, pieza.fila)).toBe(true);
    });

    it('debe detectar una colision con la pared derecha', () => {
        const tablero = new Tablero();
        const pieza = new PiezaCuadrado();

        expect(tablero.colisiona(pieza, 9, pieza.fila)).toBe(true);
    });

    it('debe detectar una colision con el fondo', () => {
        const tablero = new Tablero();
        const pieza = new PiezaCuadrado();

        expect(tablero.colisiona(pieza, pieza.columna, 19)).toBe(true);
    });

    it('debe detectar una colision con bloques fijados', () => {
        const tablero = new Tablero();
        const piezaFijada = new PiezaCuadrado();
        const piezaNueva = new PiezaCuadrado();

        tablero.fijarPieza(piezaFijada);

        expect(
            tablero.colisiona(piezaNueva, piezaNueva.columna, piezaNueva.fila)
        ).toBe(true);
    });

    it('no debe cambiar si la pieza atraviesa una pared', () => {
        const tablero = new Tablero();
        const pieza = new PiezaCuadrado();
        pieza.moverIzquierda();
        pieza.moverIzquierda();
        pieza.moverIzquierda();
        pieza.moverIzquierda();
        const estadoAnterior = tablero.celdas;

        expect(tablero.fijarPieza(pieza)).toBe(false);
        expect(tablero.celdas).toEqual(estadoAnterior);
    });

    it('no debe cambiar si la pieza atraviesa el fondo', () => {
        const tablero = new Tablero();
        const pieza = new PiezaCuadrado();
        for (let movimiento = 0; movimiento < 19; movimiento++) {
            pieza.moverAbajo();
        }
        const estadoAnterior = tablero.celdas;

        expect(tablero.fijarPieza(pieza)).toBe(false);
        expect(tablero.celdas).toEqual(estadoAnterior);
    });

    it('no debe exponer sus celdas internas para modificacion', () => {
        const tablero = new Tablero();
        const celdasConsultadas = tablero.celdas;

        celdasConsultadas[0][0] = 1;

        expect(tablero.celdas[0][0]).toBe(0);
    });
});
