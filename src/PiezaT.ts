import {Pieza} from "./Pieza";

export class PiezaT extends Pieza {
    constructor(
        private _nombre: string = "T"
    ) {
        super(_nombre);
    }
}