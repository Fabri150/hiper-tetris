import { IRotador } from "./IRotador";

export abstract class Pieza implements IRotador {

    constructor(
        private _nombre: string,
        private _forma: number[][] = [],
    ) {}

    abstract rotarIzquierda(): void;
    abstract rotarDerecha(): void;
}