import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { Reloj } from "../src/Reloj";

describe("Reloj", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    test("un tick manual ejecuta el callback exactamente una vez", () => {
        const callback = vi.fn();
        const reloj = new Reloj(1000, callback);

        reloj.tick();

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test("iniciar ejecuta un tick al cumplirse el intervalo", () => {
        const callback = vi.fn();
        const reloj = new Reloj(1000, callback);

        reloj.iniciar();
        vi.advanceTimersByTime(1000);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test("detener evita ticks posteriores", () => {
        const callback = vi.fn();
        const reloj = new Reloj(1000, callback);

        reloj.iniciar();
        reloj.detener();
        vi.advanceTimersByTime(2000);

        expect(callback).not.toHaveBeenCalled();
    });

    test("iniciar dos veces no crea intervalos simultaneos", () => {
        const callback = vi.fn();
        const reloj = new Reloj(1000, callback);

        reloj.iniciar();
        reloj.iniciar();
        vi.advanceTimersByTime(1000);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test("cambiarVelocidad actualiza un reloj iniciado", () => {
        const callback = vi.fn();
        const reloj = new Reloj(1000, callback);

        reloj.iniciar();
        reloj.cambiarVelocidad(500);
        vi.advanceTimersByTime(1000);

        expect(callback).toHaveBeenCalledTimes(2);
    });

    test("cambiarVelocidad no inicia un reloj detenido", () => {
        const callback = vi.fn();
        const reloj = new Reloj(1000, callback);

        reloj.cambiarVelocidad(500);
        vi.advanceTimersByTime(1000);

        expect(callback).not.toHaveBeenCalled();
    });
});
