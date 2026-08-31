import { Pieza } from "./Pieza";

export class PiezaPalo extends Pieza {
    constructor() {
        super("Palo", [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]);
    }
}