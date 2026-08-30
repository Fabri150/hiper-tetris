import { IRotador } from "./IRotador";

export abstract class Pieza implements IRotador {
    protected _x: number = 3;
    protected _y: number = 0;
    constructor(
        protected _nombre: string,
        protected _forma: number[][] = [],
    ) {}

    get forma() { return this._forma; }
    get nombre() { return this._nombre; }
    get x() { return this._x; }
    get y() { return this._y; }

    moverAbajo() { this._y++; }
    moverIzquierda() { this._x--; }
    moverDerecha() { this._x++; }

    abstract rotarIzquierda(): void;
    abstract rotarDerecha(): void;
}