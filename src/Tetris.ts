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
        this.ejecutarSiActivo(() => {
            this.estadoActual = "jugando";
            this.reloj.iniciar();
        });
    }

    detener(): void {
        this.reloj.detener();
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

    private ejecutarSiActivo(accion: () => void): void {
        this.estadoActual !== "terminado" && accion();
    }

    private ejecutarCicloCaida(): void {
        this.ejecutarSiActivo(() => {
            const bloqueada = this.tablero.colisiona(
                this.piezaActual, this.piezaActual.columna, this.piezaActual.fila + 1
            );
            bloqueada ? this.fijarYContinuar() : this.piezaActual.moverAbajo();
        });
    }

    private fijarYContinuar(): void {
        this.tablero.fijarPieza(this.piezaActual);
        this.tablero.limpiarLineas();
        this.cantidadLineas >= this.objetivoLineas
            ? this.finalizar()
            : this.crearSiguientePieza();
    }

    private crearSiguientePieza(): void {
        const nuevaPieza = generarPiezaAleatoria(this.random);
        this.tablero.ubicarPiezaArriba(nuevaPieza, this.random)
            ? this.piezaActual = nuevaPieza
            : this.finalizar();
    }

    private finalizar(): void {
        this.estadoActual = "terminado";
        this.reloj.detener();
    }

    moverIzquierda(): void {
        this.intentarAccion(
            () => this.piezaActual.moverIzquierda(),
            () => this.piezaActual.moverDerecha()
        );
    }

    moverDerecha(): void {
        this.intentarAccion(
            () => this.piezaActual.moverDerecha(),
            () => this.piezaActual.moverIzquierda()
        );
    }

    rotarIzquierda(): void {
        this.intentarAccion(
            () => this.piezaActual.rotarIzquierda(),
            () => this.piezaActual.rotarDerecha()
        );
    }

    rotarDerecha(): void {
        this.intentarAccion(
            () => this.piezaActual.rotarDerecha(),
            () => this.piezaActual.rotarIzquierda()
        );
    }

    private intentarAccion(accion: () => void, deshacer: () => void): void {
        this.ejecutarSiActivo(() => {
            accion();
            this.tablero.colisiona(
                this.piezaActual, this.piezaActual.columna, this.piezaActual.fila
            ) && deshacer();
        });
    }
}
