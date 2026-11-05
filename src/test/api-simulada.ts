import { vi } from "vitest";
import { REPUESTOS_API } from "./fixtures";

// Simula TODAS las peticiones de red de la aplicación para que las pruebas
// sean reproducibles y no dependan de internet ni del backend:
//   - GET /api/catalog/parts       → lista de repuestos (fixtures)
//   - GET /api/catalog/parts/:id   → un repuesto, o 404 si no existe
//   - API de tipo de cambio        → 1 USD = ₡500
// Cada prueba puede cambiar el comportamiento de una de las dos APIs.

interface OpcionesApi {
    catalogo?: "ok" | "error";
    tipoCambio?: "ok" | "pendiente" | "error";
}

function respuesta(estado: number, cuerpo: unknown) {
    return Promise.resolve({
        ok: estado >= 200 && estado < 300,
        status: estado,
        json: () => Promise.resolve(cuerpo),
    });
}

export function simularApi({ catalogo = "ok", tipoCambio = "ok" }: OpcionesApi = {}) {
    vi.stubGlobal(
        "fetch",
        vi.fn((entrada: RequestInfo | URL) => {
            const url = String(entrada);

            if (url.includes("/api/catalog/parts")) {
                if (catalogo === "error") {
                    return respuesta(500, { message: "No fue posible consultar el catálogo." });
                }

                const detalle = url.match(/\/api\/catalog\/parts\/(\d+)$/);

                if (detalle) {
                    const repuesto = REPUESTOS_API.find((r) => r.id === Number(detalle[1]));

                    return repuesto
                        ? respuesta(200, { ...repuesto, images: [] })
                        : respuesta(404, { message: "Repuesto no encontrado." });
                }

                return respuesta(200, REPUESTOS_API);
            }

            if (url.includes("frankfurter")) {
                if (tipoCambio === "pendiente") return new Promise(() => {}); // nunca responde
                if (tipoCambio === "error") return Promise.reject(new Error("sin red"));

                return respuesta(200, { rate: 500 });
            }

            return Promise.reject(new Error(`Petición no simulada: ${url}`));
        })
    );
}
