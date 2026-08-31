import { Reloj } from './Reloj';
import { Tablero } from './Tablero';
import { PiezaT } from './piezas/PiezaT';
import { PiezaPalo } from './piezas/PiezaPalo';
import { PiezaPerro } from './piezas/PiezaPerro';
import { PiezaCuadrado } from './piezas/PiezaCuadrado';
import { generarPiezaAleatoria } from './piezas/GeneradorPiezas';

export class Juego {
    private tablero = new Tablero();
    private piezaActual = new PiezaT();
    private reloj: Reloj;

    constructor() {
        this.reloj = new Reloj(1000, () => this.ejecutarCicloCaida()); //caida automatica cada 1 segundo
    }

    iniciar() {
        this.reloj.iniciar();
    }


   private ejecutarCicloCaida() {
    const futuroY = this.piezaActual.fila + 1;

    if (!this.tablero.colisiona(this.piezaActual, this.piezaActual.columna, futuroY)) {
        this.piezaActual.moverAbajo();
    } else {
        // 1. Fijar pieza actual al tablero (Falta hacer este metodo)
        // this.tablero.fijarPieza(this.piezaActual);
        
        // 2. Generar la nueva pieza
        this.piezaActual = generarPiezaAleatoria();
    }
}

    // Lógica impulsada por el usuario (Teclado)
    moverIzquierda() {
        const futuroX = this.piezaActual.columna - 1;
        if (!this.tablero.colisiona(this.piezaActual, futuroX, this.piezaActual.fila)) {
            this.piezaActual.moverIzquierda();
        }
    }

    moverDerecha() {
        const futuroX = this.piezaActual.columna + 1;
        if (!this.tablero.colisiona(this.piezaActual, futuroX, this.piezaActual.fila)) {
            this.piezaActual.moverDerecha();
        }
    }
}