import { Pieza } from "./Pieza";

export class PiezaPalo extends Pieza {

    constructor() {
        super("Palo", [
            [1, 1, 1, 1]
        ]);
    }

    rotarDerecha(): void {
        const filas = this._forma.length;
        const columnas = this._forma[0].length;

        const nuevaForma: number[][] = [];

        for (let columna = 0; columna < columnas; columna++) {
            const nuevaFila: number[] = [];

            for (let fila = filas - 1; fila >= 0; fila--) {
                nuevaFila.push(this._forma[fila][columna]);
            }

            nuevaForma.push(nuevaFila);
        }

        this._forma = nuevaForma;
    }

    rotarIzquierda(): void {
        const filas = this._forma.length;
        const columnas = this._forma[0].length;

        const nuevaForma: number[][] = [];

        for (let columna = columnas - 1; columna >= 0; columna--) {
            const nuevaFila: number[] = [];

            for (let fila = 0; fila < filas; fila++) {
                nuevaFila.push(this._forma[fila][columna]);
            }

            nuevaForma.push(nuevaFila);
        }

        this._forma = nuevaForma;
    }
}