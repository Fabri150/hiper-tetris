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
    }