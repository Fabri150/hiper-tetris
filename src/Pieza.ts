import { IRotador } from "./IRotador";

export abstract class Pieza implements IRotador {

    constructor(
        private _nombre: string
    ) {}

    abstract rotarIzquierda(): void;
    abstract rotarDerecha(): void;
}