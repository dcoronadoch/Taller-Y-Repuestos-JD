import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface FavoritesContextValue {
    favoritosIds: number[];
    agregarFavorito: (id: number) => void;
    quitarFavorito: (id: number) => void;
    alternarFavorito: (id: number) => void;
    esFavorito: (id: number) => boolean;
    vaciarFavoritos: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const CLAVE_ALMACENAMIENTO = "taller-jd-repuestos-favoritos";

interface FavoritesProviderProps {
    children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
    const [favoritosIds, setFavoritosIds] = useState<number[]>(() => {
        try {
            const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
            if (!guardado) return [];

            const datos: unknown = JSON.parse(guardado);
            return Array.isArray(datos)
                ? datos.filter((id): id is number => typeof id === "number")
                : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(favoritosIds));
    }, [favoritosIds]);

    const value = useMemo<FavoritesContextValue>(() => ({
        favoritosIds,
        agregarFavorito: (id) => {
            setFavoritosIds((actual) =>
                actual.includes(id) ? actual : [...actual, id]
            );
        },
        quitarFavorito: (id) => {
            setFavoritosIds((actual) => actual.filter((favId) => favId !== id));
        },
        alternarFavorito: (id) => {
            setFavoritosIds((actual) =>
                actual.includes(id)
                    ? actual.filter((favId) => favId !== id)
                    : [...actual, id]
            );
        },
        esFavorito: (id) => favoritosIds.includes(id),
        vaciarFavoritos: () => setFavoritosIds([]),
    }), [favoritosIds]);

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavorites debe utilizarse dentro de FavoritesProvider");
    }

    return context;
}