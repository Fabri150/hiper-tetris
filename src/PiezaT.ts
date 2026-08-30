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

        for (let i = 0; i < n; i++) {
            nuevaForma.push([]);
            for (let j = 0; j < n; j++) {
                nuevaForma[i][j] = this._forma[n - 1 - j][i];
            }
        }
        
        this._forma = nuevaForma;
    }

    rotarIzquierda(): void {
        const n = this._forma.length;
        const nuevaForma: number[][] = [];

        for (let i = 0; i < n; i++) {
            nuevaForma.push([]);
            for (let j = 0; j < n; j++) {
                nuevaForma[i][j] = this._forma[j][n - 1 - i];
            }
        }
        
        this._forma = nuevaForma;
    }
}