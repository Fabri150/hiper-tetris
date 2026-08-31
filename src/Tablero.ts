import { Pieza } from "./piezas/Pieza";

export class Tablero {
    private _celdas: number[][];
    constructor (
     private _ancho: number = 10,
     private _alto: number = 20

    ) {
        this._celdas = Array.from({ length: this._alto }, () => Array(this._ancho).fill(0));
    }
    get celdas(): number[][] {
        return this._celdas; }

colisiona(pieza: Pieza, futuroX: number, futuroY: number): boolean {
    const matriz = pieza.forma;

    for (let f = 0; f < matriz.length; f++) {
        for (let c = 0; c < matriz[f].length; c++) {

            if (matriz[f][c] === 0) continue;

            const tableroX = futuroX + c;
            const tableroY = futuroY + f;

            // 1. Choca con pared Izquierda o Derecha
            if (tableroX < 0 || tableroX >= this._ancho) {
                return true;
            }

            // 2. Choca con el fondo
            if (tableroY >= this._alto) {
                return true;
            }

            if (tableroY >= 0 && this._celdas[tableroY][tableroX] !== 0) {
                return true;
            }
        }
    }
    
    return false;
}
}