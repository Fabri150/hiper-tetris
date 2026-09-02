export class Reloj {
    private _timerId: ReturnType<typeof setInterval> | undefined;

    constructor(
        private _intervaloMs: number = 1000,
        private _onTick: () => void
    ) {}

    iniciar(): void {
        this.detener();
        this._timerId = setInterval(() => this._onTick(), this._intervaloMs);
    }

    detener(): void {
        clearInterval(this._timerId);
        this._timerId = undefined;
    }

    cambiarVelocidad(nuevoIntervaloMs: number): void {
        const estabaCorriendo = this._timerId !== undefined;
        this._intervaloMs = nuevoIntervaloMs;
        this.detener();
        estabaCorriendo && this.iniciar();
    }
}