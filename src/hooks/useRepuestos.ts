import { useEffect, useState } from "react";
import type { Repuesto } from "../data/data";
import {
    obtenerRepuesto,
    obtenerRepuestos,
    RepuestoNoEncontradoError,
} from "../services/repuestos.service";

function esAbort(error: unknown) {
    return error instanceof DOMException && error.name === "AbortError";
}

function mensaje(error: unknown) {
    return error instanceof Error
        ? error.message
        : "Ocurrió un error al consultar los repuestos.";
}

interface UseRepuestosResult {
    repuestos: Repuesto[];
    cargando: boolean;
    error: string | null;
    recargar: () => void;
}

// Lista de repuestos publicados, con estados de carga y error.
export function useRepuestos(): UseRepuestosResult {
    const [repuestos, setRepuestos] = useState<Repuesto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [intento, setIntento] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function cargar() {
            try {
                setCargando(true);
                setError(null);

                setRepuestos(await obtenerRepuestos(controller.signal));
            } catch (err) {
                if (esAbort(err)) return;

                setError(mensaje(err));
            } finally {
                if (!controller.signal.aborted) {
                    setCargando(false);
                }
            }
        }

        void cargar();

        return () => controller.abort();
    }, [intento]);

    return {
        repuestos,
        cargando,
        error,
        recargar: () => setIntento((actual) => actual + 1),
    };
}

interface UseRepuestoResult {
    repuesto: Repuesto | null;
    cargando: boolean;
    noEncontrado: boolean;
    error: string | null;
    recargar: () => void;
}

// Un repuesto por su id (el parámetro de la ruta /repuesto/:id).
export function useRepuesto(idParametro: string | undefined): UseRepuestoResult {
    const id = Number(idParametro);
    const idValido = Number.isInteger(id) && id > 0;

    const [repuesto, setRepuesto] = useState<Repuesto | null>(null);
    const [cargando, setCargando] = useState(true);
    const [noEncontrado, setNoEncontrado] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [intento, setIntento] = useState(0);

    useEffect(() => {
        // Un id que no es un número no se consulta al servidor.
        if (!idValido) return;

        const controller = new AbortController();

        async function cargar() {
            try {
                setCargando(true);
                setNoEncontrado(false);
                setError(null);
                setRepuesto(null);

                setRepuesto(await obtenerRepuesto(id, controller.signal));
            } catch (err) {
                if (esAbort(err)) return;

                if (err instanceof RepuestoNoEncontradoError) {
                    setNoEncontrado(true);
                } else {
                    setError(mensaje(err));
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCargando(false);
                }
            }
        }

        void cargar();

        return () => controller.abort();
    }, [id, idValido, intento]);

    return {
        repuesto: idValido ? repuesto : null,
        cargando: idValido && cargando,
        noEncontrado: !idValido || noEncontrado,
        error: idValido ? error : null,
        recargar: () => setIntento((actual) => actual + 1),
    };
}
