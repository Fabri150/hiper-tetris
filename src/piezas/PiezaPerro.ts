import { Pieza } from "./Pieza";

type LadoPerro = "izquierda" | "derecha";

export class PiezaPerro extends Pieza {
    constructor(lado: LadoPerro = "izquierda") {
        super(
            `Perro ${lado}`,
            lado === "izquierda"
                ? [
                    [0, 1, 1],
                    [1, 1, 0],
                    [0, 0, 0]
                ]
                : [
                    [1, 1, 0],
                    [0, 1, 1],
                    [0, 0, 0]
                ]
        );
    }
}