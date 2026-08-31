import { Pieza } from './Pieza';
import { PiezaT } from './PiezaT';
import { PiezaCuadrado } from './PiezaCuadrado';
import { PiezaPerro } from "./PiezaPerro";
import { PiezaPalo } from "./PiezaPalo";
import { PiezaL } from "./PiezaL";


export function generarPiezaAleatoria(random: () => number = Math.random): Pieza {
    const piezasDisponibles = [
        new PiezaT(),
        new PiezaCuadrado(),
        new PiezaPalo(),
        new PiezaL("izquierda"),
        new PiezaL("derecha"),
        new PiezaPerro("izquierda"),
        new PiezaPerro("derecha")
    ];

    const indiceAleatorio = Math.floor(random() * piezasDisponibles.length);
    
    return piezasDisponibles[indiceAleatorio];
}
