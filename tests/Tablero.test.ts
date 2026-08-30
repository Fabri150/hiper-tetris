import { describe, it, expect } from 'vitest';
import { Tablero } from '../src/Tablero';

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
})
