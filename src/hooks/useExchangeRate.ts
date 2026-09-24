import { useEffect, useState } from "react";

interface UseExchangeRateResult {
    tipoCambio: number | null;
    cargando: boolean;
    error: string | null;
}

export function useExchangeRate(): UseExchangeRateResult {
    const [tipoCambio, setTipoCambio] = useState<number | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function obtenerTipoCambio() {
            try {
                setCargando(true);
                setError(null);

                const respuesta = await fetch(
                    "https://api.frankfurter.dev/v2/providers/bccr/rate/usd/crc",
                    { signal: controller.signal }
                );

                if (!respuesta.ok) {
                    throw new Error("No fue posible obtener el tipo de cambio.");
                }

                const datos = await respuesta.json();
                const tasa = Number(datos.rate);

                if (!Number.isFinite(tasa) || tasa <= 0) {
                    throw new Error("La API devolvió un tipo de cambio inválido.");
                }

                setTipoCambio(tasa);
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "Ocurrió un error al consultar el tipo de cambio."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setCargando(false);
                }
            }
        }

        obtenerTipoCambio();

        return () => controller.abort();
    }, []);

    return { tipoCambio, cargando, error };
}