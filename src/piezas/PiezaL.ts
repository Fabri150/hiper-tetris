import { Pieza } from "./Pieza";

type LadoL = "izquierda" | "derecha";

export class PiezaL extends Pieza {
    constructor(lado: LadoL = "izquierda") {
        super(
            `L ${lado}`,
            lado === "izquierda"
                ? [
                    [1, 0, 0],
                    [1, 0, 0],
                    [1, 1, 0]
                ]
                : [
                    [0, 1, 0],
                    [0, 1, 0],
                    [1, 1, 0]
                ]
        );
    }
}