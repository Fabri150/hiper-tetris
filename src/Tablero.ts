import { Pieza } from "./piezas/Pieza";

export class Tablero {
    private _celdas: number[][];
    private _cantidadLineas = 0;

    constructor(private _ancho = 10, private _alto = 20) {
        this._celdas = Array.from({ length: this._alto }, () => Array(this._ancho).fill(0));
    }

    get celdas(): number[][] {
        return this._celdas.map(fila => [...fila]);
    }

    // Convierte solamente los bloques ocupados en coordenadas del tablero.
    private bloques(pieza: Pieza, x = pieza.columna, y = pieza.fila) {
        return pieza.forma.flatMap((fila, f) =>
            fila.map((celda, c) => ({ celda, columna: x + c, fila: y + f }))
                .filter(bloque => bloque.celda !== 0)
        );
    }

    fijarPieza(pieza: Pieza): boolean {
        const bloques = this.bloques(pieza);
        if (bloques.some(({ fila, columna }) => this._celdas[fila]?.[columna] !== 0)) {
            return false;
        }

        bloques.forEach(({ fila, columna }) => this._celdas[fila][columna] = 1);
        return true;
    }

    ubicarPiezaArriba(pieza: Pieza, random: () => number = Math.random): boolean {
        const columnasValidas = Array.from(
            { length: Math.max(0, this._ancho - pieza.forma[0].length + 1) },
            (_, columna) => columna
        ).filter(columna => !this.colisiona(pieza, columna, 0));

        if (columnasValidas.length === 0) return false;

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
        return this.bloques(pieza, futuroX, futuroY).some(({ fila, columna }) =>
            columna < 0 || columna >= this._ancho || fila >= this._alto ||
            (fila >= 0 && this._celdas[fila][columna] !== 0)
        );
    }
}
