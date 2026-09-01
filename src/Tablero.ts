import { Pieza } from "./piezas/Pieza";

export class Tablero {
    private _celdas: number[][];
    private _cantidadLineas: number = 0;

    constructor (
     private _ancho: number = 10,
     private _alto: number = 20

    ) {
        this._celdas = Array.from({ length: this._alto }, () => Array(this._ancho).fill(0));
    }
    get celdas(): number[][] {
        return this._celdas.map(fila => [...fila]);
    }


    fijarPieza(pieza: Pieza): boolean {
        const matriz = pieza.forma;
        const bloques: Array<[number, number]> = [];

        for (let f = 0; f < matriz.length; f++) {
            for (let c = 0; c < matriz[f].length; c++) {
                if (matriz[f][c] === 0) continue;

                const tableroY = pieza.fila + f;
                const tableroX = pieza.columna + c;
                const estaFuera =
                    tableroY < 0 || tableroY >= this._alto ||
                    tableroX < 0 || tableroX >= this._ancho;

                if (estaFuera || this._celdas[tableroY][tableroX] !== 0) {
                    return false;
                }

                bloques.push([tableroY, tableroX]);
            }
        }

        for (const [fila, columna] of bloques) {
            this._celdas[fila][columna] = 1;
        }

        return true;
    }

    ubicarPiezaArriba(
        pieza: Pieza,
        random: () => number = Math.random
    ): boolean {
        const anchoPieza = pieza.forma[0].length;
        const columnasValidas: number[] = [];

        for (let columna = 0; columna <= this._ancho - anchoPieza; columna++) {
            if (!this.colisiona(pieza, columna, 0)) {
                columnasValidas.push(columna);
            }
        }

        if (columnasValidas.length === 0) {
            return false;
        }

        const indice = Math.floor(random() * columnasValidas.length);
        pieza.posicionar(columnasValidas[indice], 0);
        return true;
    }

    limpiarLineas(): number {
        const filasIncompletas = this._celdas.filter(
            fila => !fila.every(celda => celda !== 0)
        );
        const lineasEliminadas = this._alto - filasIncompletas.length;
        const filasVacias = Array.from(
            { length: lineasEliminadas },
            () => Array(this._ancho).fill(0)
        );

        this._celdas = [...filasVacias, ...filasIncompletas];
        this._cantidadLineas += lineasEliminadas;

        return lineasEliminadas;
    }

    cantidadLineas(): number {
        return this._cantidadLineas;
    }

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
