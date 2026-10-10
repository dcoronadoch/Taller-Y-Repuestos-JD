import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, vi } from "vitest";

// jsdom no implementa window.scrollTo (lo usa ScrollToTop)
window.scrollTo = vi.fn();

// Por defecto, ninguna prueba hace peticiones reales a la red:
// la API de tipo de cambio responde con un valor fijo (1 USD = ₡500).
beforeEach(() => {
    vi.stubGlobal(
        "fetch",
        vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ rate: 500 }),
            })
        )
    );
});

afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
});