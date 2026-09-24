import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { repuestos, type CartItem, type Repuesto } from "../data/data";

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

interface CarritoGuardado {
    id: number;
    cantidad: number;
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

            return datos
                .filter(
                    (item): item is CarritoGuardado =>
                        typeof item === "object" &&
                        item !== null &&
                        typeof (item as CarritoGuardado).id === "number" &&
                        typeof (item as CarritoGuardado).cantidad === "number"
                )
                .map((item) => {
                    const repuesto = repuestos.find((r) => r.id === item.id);
                    return repuesto ? { repuesto, cantidad: item.cantidad } : null;
                })
                .filter((item): item is CartItem => item !== null);
        } catch {
            return [];
        }
    });

    useEffect(() => {
        const paraGuardar: CarritoGuardado[] = carrito.map((item) => ({
            id: item.repuesto.id,
            cantidad: item.cantidad,
        }));

        localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(paraGuardar));
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