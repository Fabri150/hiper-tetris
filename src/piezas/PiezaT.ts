import { Pieza } from './Pieza';

export class PiezaT extends Pieza {
    constructor() {
        super('T', [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]);
    }

    rotarDerecha(): void {
        const n = this._forma.length;
        const nuevaForma: number[][] = [];

        for (let columna = 0; columna < n; columna++) {
            nuevaForma.push([]);
            for (let fila = 0; fila < n; fila++) {
                nuevaForma[columna][fila] = this._forma[n - 1 - fila][columna];
            }
        }
        
        this._forma = nuevaForma;
    }

    rotarIzquierda(): void {
        const n = this._forma.length;
        const nuevaForma: number[][] = [];

        for (let columna = 0; columna < n; columna++) {
            nuevaForma.push([]);
            for (let fila = 0; fila < n; fila++) {
                nuevaForma[columna][fila] = this._forma[fila][n - 1 - columna];
            }
        }
        
        this._forma = nuevaForma;
    }
}