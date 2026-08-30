import { Pieza } from "./Pieza";

export class PiezaCuadrado extends Pieza {

    constructor() {
        super("Cuadrado", [
            [1, 1],
            [1, 1]
        ]);
    }

    rotarIzquierda(): void {
    }

    rotarDerecha(): void {
    }
}