// Tipos del Front Office. Los repuestos ya no están escritos aquí:
// se obtienen del backend (ver src/services/repuestos.service.ts).

export interface Repuesto {
    id: number;
    nombre: string;
    descripcion?: string | null;
    categoria: string;
    marca: string;
    precio: number;
    disponible: boolean;
    imagen: string;
}

export interface CartItem {
    repuesto: Repuesto;
    cantidad: number;
}