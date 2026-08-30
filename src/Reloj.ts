export class Reloj {
    private timerId: ReturnType<typeof setInterval> | undefined;
    constructor(
        private _intervaloMs: number = 1000,
        private _onTick: () => void
    ) {}
}