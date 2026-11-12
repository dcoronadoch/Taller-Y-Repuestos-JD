import { API_URL } from "../config/api";

type Oyente = () => void;

const oyentes = new Set<Oyente>();
let fuente: EventSource | null = null;

// Avisa cuando el backend reporta un cambio. Devuelve la función para dejar de escuchar.
export function escucharCambios(oyente: Oyente): () => void {
    oyentes.add(oyente);

    if (!fuente) {
        fuente = new EventSource(`${API_URL}/events`);
        fuente.addEventListener("change", () => {
            oyentes.forEach((fn) => fn());
        });
    }

    return () => {
        oyentes.delete(oyente);

        if (oyentes.size === 0 && fuente) {
            fuente.close();
            fuente = null;
        }
    };
}