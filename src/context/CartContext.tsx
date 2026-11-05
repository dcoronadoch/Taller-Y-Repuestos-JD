import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Repuesto } from "../data/data";

interface CartContextValue {
    carrito: CartItem[];
    totalItems: number;
    agregarAlCarrito: (repuesto: Repuesto, cantidad?: number) => void;
    cambiarCantidad: (id: number, cantidad: number) => void;
    quitarDelCarrito: (id: number) => void;
    vaciarCarrito: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CLAVE_ALMACENAMIENTO = "taller-jd-carrito";

// El carrito guarda una copia de cada repuesto (nombre, precio, imagen...),
// porque los repuestos ya no están en el código: viven en la base de datos.
function esRepuestoValido(valor: unknown): valor is Repuesto {
    if (typeof valor !== "object" || valor === null) return false;

    const r = valor as Record<string, unknown>;

    return (
        typeof r.id === "number" &&
        typeof r.nombre === "string" &&
        typeof r.categoria === "string" &&
        typeof r.marca === "string" &&
        typeof r.precio === "number" &&
        Number.isFinite(r.precio) &&
        typeof r.disponible === "boolean" &&
        typeof r.imagen === "string"
    );
}

function esItemValido(valor: unknown): valor is CartItem {
    if (typeof valor !== "object" || valor === null) return false;

    const item = valor as Record<string, unknown>;

    return (
        esRepuestoValido(item.repuesto) &&
        typeof item.cantidad === "number" &&
        Number.isInteger(item.cantidad) &&
        item.cantidad >= 1
    );
}

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [carrito, setCarrito] = useState<CartItem[]>(() => {
        try {
            const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
            if (!guardado) return [];

            const datos: unknown = JSON.parse(guardado);
            if (!Array.isArray(datos)) return [];

            // Lo guardado con el formato anterior (solo id y cantidad) se descarta.
            return datos.filter(esItemValido);
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(carrito));
    }, [carrito]);

    const value = useMemo<CartContextValue>(() => {
        function agregarAlCarrito(repuesto: Repuesto, cantidad: number = 1) {
            setCarrito((anterior) => {
                const existente = anterior.find(
                    (item) => item.repuesto.id === repuesto.id
                );

                if (existente) {
                    return anterior.map((item) =>
                        item.repuesto.id === repuesto.id
                            ? { ...item, cantidad: item.cantidad + cantidad }
                            : item
                    );
                }

                return [...anterior, { repuesto, cantidad }];
            });
        }

        function cambiarCantidad(id: number, cantidad: number) {
            setCarrito((anterior) =>
                anterior.map((item) =>
                    item.repuesto.id === id
                        ? { ...item, cantidad: Math.max(1, cantidad) }
                        : item
                )
            );
        }

        function quitarDelCarrito(id: number) {
            setCarrito((anterior) =>
                anterior.filter((item) => item.repuesto.id !== id)
            );
        }

        function vaciarCarrito() {
            setCarrito([]);
        }

        const totalItems = carrito.reduce(
            (total, item) => total + item.cantidad,
            0
        );

        return {
            carrito,
            totalItems,
            agregarAlCarrito,
            cambiarCantidad,
            quitarDelCarrito,
            vaciarCarrito,
        };
    }, [carrito]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart debe utilizarse dentro de CartProvider");
    }

    return context;
}