import { Pieza } from "./Pieza";

export class PiezaT extends Pieza {
    constructor() {
        super("T", [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]);
    }
}