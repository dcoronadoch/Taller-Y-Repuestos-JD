import { API_URL } from "../config/api";
import type { Repuesto } from "../data/data";
import sinImagen from "../assets/repuestos/sin-imagen.svg";

// Forma de los datos que devuelve el backend (rutas públicas /api/catalog).
interface RepuestoApi {
    id: number;
    sku: string;
    name: string;
    description: string | null;
    price: number;
    available: boolean;
    brand: string;
    category: string;
    image_url: string | null;
}

interface RepuestoDetalleApi extends RepuestoApi {
    images: { id: number; url: string; is_primary: boolean }[];
}

export class RepuestoNoEncontradoError extends Error {
    constructor() {
        super("El repuesto que buscas no existe o fue removido.");
        this.name = "RepuestoNoEncontradoError";
    }
}

// Traduce los nombres del backend a los que usa el Front Office.
function aRepuesto(api: RepuestoApi): Repuesto {
    return {
        id: api.id,
        nombre: api.name,
        descripcion: api.description,
        categoria: api.category,
        marca: api.brand,
        precio: api.price,
        disponible: api.available,
        imagen: api.image_url || sinImagen,
    };
}

async function pedirJson<T>(ruta: string, signal?: AbortSignal): Promise<T> {
    let respuesta: Response;

    try {
        respuesta = await fetch(`${API_URL}${ruta}`, { signal });
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw error;
        }

        throw new Error(
            "No se pudo conectar con el servidor. Intenta de nuevo en unos minutos.",
            { cause: error }
        );
    }

    if (respuesta.status === 404) {
        throw new RepuestoNoEncontradoError();
    }

    if (!respuesta.ok) {
        const datos = await respuesta.json().catch(() => null);

        throw new Error(
            datos?.message || "No fue posible obtener los datos del servidor."
        );
    }

    return (await respuesta.json()) as T;
}

// GET /api/catalog/parts — todos los repuestos publicados.
export async function obtenerRepuestos(signal?: AbortSignal): Promise<Repuesto[]> {
    const datos = await pedirJson<RepuestoApi[]>("/catalog/parts", signal);

    return datos.map(aRepuesto);
}

// GET /api/catalog/parts/:id — un repuesto (lanza RepuestoNoEncontradoError si no existe).
export async function obtenerRepuesto(
    id: number,
    signal?: AbortSignal
): Promise<Repuesto> {
    const datos = await pedirJson<RepuestoDetalleApi>(
        `/catalog/parts/${id}`,
        signal
    );

    return aRepuesto(datos);
}
