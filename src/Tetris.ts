import { Reloj } from './Reloj';
import { Tablero } from './Tablero';
import { generarPiezaAleatoria } from './piezas/GeneradorPiezas';
import { Pieza } from './piezas/Pieza';

export class Tetris {
    private tablero = new Tablero();
    private piezaActual: Pieza;
    private reloj: Reloj;

    constructor(private random: () => number = Math.random) {
        this.piezaActual = generarPiezaAleatoria(this.random);
        this.tablero.ubicarPiezaArriba(this.piezaActual, this.random);
        this.reloj = new Reloj(1000, () => this.ejecutarCicloCaida()); //caida automatica cada 1 segundo
    }

    iniciar() {
        this.reloj.iniciar();
    }

    detener(): void {
        this.reloj.detener();
    }

    tick(): void {
        this.reloj.tick();
    }

    get estadoPiezaActual() {
        return {
            nombre: this.piezaActual.nombre,
            forma: this.piezaActual.forma.map(fila => [...fila]),
            columna: this.piezaActual.columna,
            fila: this.piezaActual.fila
        };
    }

    get celdasTablero(): number[][] {
        return this.tablero.celdas;
    }


   private ejecutarCicloCaida(): void {
        const futuroY = this.piezaActual.fila + 1;

        if (!this.tablero.colisiona(this.piezaActual, this.piezaActual.columna, futuroY)) {
            this.piezaActual.moverAbajo();
        } else {
            this.tablero.fijarPieza(this.piezaActual);
            
            // (Futuro paso) aca es donde también se llamara a this.tablero.limpiarLineas();
            
            // (Futuro paso) aca es donde se va vereficar si perdes si la pieza nueva nace colisionando
            
            // 2. Nace una nueva pieza arriba
            this.piezaActual = generarPiezaAleatoria(this.random);
            this.tablero.ubicarPiezaArriba(this.piezaActual, this.random);
        }
    }

    // Lógica impulsada por el teclado
    moverIzquierda(): void {
        const futuroX = this.piezaActual.columna - 1;
        if (!this.tablero.colisiona(this.piezaActual, futuroX, this.piezaActual.fila)) {
            this.piezaActual.moverIzquierda();
        }
    }

    moverDerecha(): void {
        const futuroX = this.piezaActual.columna + 1;
        if (!this.tablero.colisiona(this.piezaActual, futuroX, this.piezaActual.fila)) {
            this.piezaActual.moverDerecha();
        }
    }

    rotarIzquierda(): void {
        this.piezaActual.rotarIzquierda();

        if (this.tablero.colisiona(
            this.piezaActual,
            this.piezaActual.columna,
            this.piezaActual.fila
        )) {
            this.piezaActual.rotarDerecha();
        }
    }

    rotarDerecha(): void {
        this.piezaActual.rotarDerecha();

        if (this.tablero.colisiona(
            this.piezaActual,
            this.piezaActual.columna,
            this.piezaActual.fila
        )) {
            this.piezaActual.rotarIzquierda();
        }
    }
}
