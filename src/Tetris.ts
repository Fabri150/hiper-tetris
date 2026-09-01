import { Reloj } from './Reloj';
import { Tablero } from './Tablero';
import { PiezaT } from './piezas/PiezaT';
import { generarPiezaAleatoria } from './piezas/GeneradorPiezas';

export class Tetris {
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
            this.tablero.fijarPieza(this.piezaActual);
            
            // (Futuro paso) aca es donde también se llamara a this.tablero.limpiarLineas();
            
            // (Futuro paso) aca es donde se va vereficar si perdes si la pieza nueva nace colisionando
            
            // 2. Nace una nueva pieza arriba
            this.piezaActual = generarPiezaAleatoria();
        }
    }

    // Lógica impulsada por el teclado
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
