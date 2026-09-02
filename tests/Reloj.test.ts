import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { Reloj } from "../src/Reloj";

describe("Reloj", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    test("solo ejecuta el callback periódicamente después de iniciar", () => {
        const callback = vi.fn();
        const reloj = new Reloj(1000, callback);
        vi.advanceTimersByTime(2000);
        expect(callback).not.toHaveBeenCalled();
        reloj.iniciar();
        vi.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(1);
        vi.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(2);
    });

    test("inicia sin duplicar intervalos y deja de ejecutar al detenerse", () => {
        const callback = vi.fn();
        const reloj = new Reloj(1000, callback);
        reloj.iniciar();
        reloj.iniciar();
        vi.advanceTimersByTime(999);
        expect(callback).not.toHaveBeenCalled();
        vi.advanceTimersByTime(1);
        expect(callback).toHaveBeenCalledTimes(1);
        reloj.detener();
        vi.advanceTimersByTime(2000);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test("cambia la velocidad de un reloj en marcha", () => {
        const callback = vi.fn();
        const reloj = new Reloj(1000, callback);
        reloj.iniciar();
        reloj.cambiarVelocidad(500);
        vi.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(2);
    });

    test("cambiar la velocidad no inicia el reloj y se aplica al iniciarlo", () => {
        const callback = vi.fn();
        const reloj = new Reloj(1000, callback);
        reloj.cambiarVelocidad(500);
        vi.advanceTimersByTime(1000);
        expect(callback).not.toHaveBeenCalled();
        reloj.iniciar();
        vi.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(2);
    });
});
