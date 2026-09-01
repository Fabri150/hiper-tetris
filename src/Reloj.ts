export class Reloj {
    private _timerId: ReturnType<typeof setInterval> | undefined;
    constructor(
        private _intervaloMs: number = 1000,
        private _onTick: () => void
    ) {}

    tick(): void {
        this._onTick();
    }

    iniciar(): void {
        this.detener(); 
        
        this._timerId = setInterval(() => {
            this.tick();
        }, this._intervaloMs);
    }

    detener(): void {
        clearInterval(this._timerId);
        this._timerId = undefined;
    }

    cambiarVelocidad(nuevoIntervaloMs: number): void {
        const estabaCorriendo = this._timerId !== undefined;
        
        this._intervaloMs = nuevoIntervaloMs;
        this.detener();

        if (estabaCorriendo) {
            this.iniciar();
        }
    }
}
