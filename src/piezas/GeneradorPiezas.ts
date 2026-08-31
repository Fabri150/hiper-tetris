import { Pieza } from './Pieza';
import { PiezaT } from './PiezaT';
import { PiezaCuadrado } from './PiezaCuadrado';
import { PiezaPerro } from "./PiezaPerro";
import { PiezaPalo } from "./PiezaPalo";


export function generarPiezaAleatoria(): Pieza {
    // Aquí agregarás la L, la I, la S, etc.
    const piezasDisponibles = [
        new PiezaT(),
        new PiezaCuadrado(),
        new PiezaPerro(),
        new PiezaPalo()
    ];

    // Math.random() elige un número entre 0 y la cantidad de piezas
    const indiceAleatorio = Math.floor(Math.random() * piezasDisponibles.length);
    
    return piezasDisponibles[indiceAleatorio];
}