import { Reloj } from './Reloj';
import { Tablero } from './Tablero';
import { generarPiezaAleatoria } from './piezas/GeneradorPiezas';
import { Pieza } from './piezas/Pieza';

export type EstadoTetris = "no-iniciado" | "jugando" | "terminado";

export class Tetris {
    private tablero = new Tablero();
    private piezaActual: Pieza;
    private reloj: Reloj;
    private estadoActual: EstadoTetris = "no-iniciado";

    constructor(
        private random: () => number = Math.random,
        private objetivoLineas: number = 5
    ) {
        this.piezaActual = generarPiezaAleatoria(this.random);
        this.tablero.ubicarPiezaArriba(this.piezaActual, this.random);
        this.reloj = new Reloj(1000, () => this.ejecutarCicloCaida());
    }

    iniciar(): void {
        if (this.estadoActual === "terminado") return;

        this.estadoActual = "jugando";
        this.reloj.iniciar();
    }

    detener(): void {
        this.reloj.detener();
    }

    tick(): void {
        if (this.estadoActual === "terminado") return;
        if (this.estadoActual === "no-iniciado") {
            this.estadoActual = "jugando";
        }

        this.reloj.tick();
    }

    get estado(): EstadoTetris {
        return this.estadoActual;
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

    get cantidadLineas(): number {
        return this.tablero.cantidadLineas();
    }
    private ejecutarCicloCaida(): void {
        if (this.estadoActual === "terminado") return;

        const futuroY = this.piezaActual.fila + 1;

        if (!this.tablero.colisiona(this.piezaActual, this.piezaActual.columna, futuroY)) {
            this.piezaActual.moverAbajo();
        } else {
            this.tablero.fijarPieza(this.piezaActual);
            this.tablero.limpiarLineas();

            if (this.tablero.cantidadLineas() >= this.objetivoLineas) {
                this.finalizar();
                return;
            }

            const nuevaPieza = generarPiezaAleatoria(this.random);

            if (!this.tablero.ubicarPiezaArriba(nuevaPieza, this.random)) {
                this.finalizar();
                return;
            }

            this.piezaActual = nuevaPieza;
        }
    }

    private finalizar(): void {
        this.estadoActual = "terminado";
        this.reloj.detener();
    }

    moverIzquierda(): void {
        if (this.estadoActual === "terminado") return;

        const futuroX = this.piezaActual.columna - 1;
        if (!this.tablero.colisiona(this.piezaActual, futuroX, this.piezaActual.fila)) {
            this.piezaActual.moverIzquierda();
        }
    }

    moverDerecha(): void {
        if (this.estadoActual === "terminado") return;

        const futuroX = this.piezaActual.columna + 1;
        if (!this.tablero.colisiona(this.piezaActual, futuroX, this.piezaActual.fila)) {
            this.piezaActual.moverDerecha();
        }
    }

    rotarIzquierda(): void {
        if (this.estadoActual === "terminado") return;

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
        if (this.estadoActual === "terminado") return;

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
