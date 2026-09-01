import { IRotador } from "../IRotador";

export abstract class Pieza implements IRotador {
    protected _columna: number = 3;
    protected _fila: number = 0;

    constructor(
        protected _nombre: string,
        protected _forma: number[][]
    ) {}

    get forma() { return this._forma; }
    get nombre() { return this._nombre; }
    get columna() { return this._columna; }
    get fila() { return this._fila; }

    moverAbajo(): void { this._fila++; }

    moverIzquierda(): void { this._columna--; }

    moverDerecha(): void { this._columna++; }
    
    posicionar(columna: number, fila: number = 0): void {
        this._columna = columna;
        this._fila = fila;
    }

    rotarDerecha(): void {
        const tamaño = this._forma.length;
        const nuevaForma: number[][] = [];

        for (let fila = 0; fila < tamaño; fila++) {
            nuevaForma.push([]);

            for (let columna = 0; columna < tamaño; columna++) {
                nuevaForma[fila][columna] =
                    this._forma[tamaño - 1 - columna][fila];
            }
        }

        this._forma = nuevaForma;
    }

    rotarIzquierda(): void {
        const tamaño = this._forma.length;
        const nuevaForma: number[][] = [];

        for (let fila = 0; fila < tamaño; fila++) {
            nuevaForma.push([]);

            for (let columna = 0; columna < tamaño; columna++) {
                nuevaForma[fila][columna] =
                    this._forma[columna][tamaño - 1 - fila];
            }
        }

        this._forma = nuevaForma;
    }
}
