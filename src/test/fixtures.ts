// Repuestos de prueba con la misma forma que devuelve el backend
// (GET /api/catalog/parts). Reemplazan a los datos fijos que antes
// estaban en src/data/data.ts.

export interface RepuestoApiPrueba {
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

export const REPUESTOS_API: RepuestoApiPrueba[] = [
    { id: 1, sku: "FR-001", name: "Pastillas de freno cerámicas", description: "Juego delantero de baja emisión de polvo.", price: 18500, available: true, brand: "Bosch", category: "Frenos", image_url: null },
    { id: 2, sku: "SU-001", name: "Amortiguador delantero", description: "Amortiguador hidráulico para eje delantero.", price: 45000, available: true, brand: "Monroe", category: "Suspensión", image_url: null },
    { id: 3, sku: "FI-001", name: "Filtro de aceite", description: null, price: 6500, available: true, brand: "Mann Filter", category: "Filtros", image_url: null },
    { id: 4, sku: "BA-001", name: "Batería 12V 650A", description: null, price: 68000, available: false, brand: "Duracell", category: "Baterías", image_url: null },
    { id: 5, sku: "MO-001", name: "Correa de distribución", description: null, price: 22000, available: true, brand: "Gates", category: "Motor", image_url: null },
    { id: 6, sku: "LU-001", name: "Aceite sintético 5W-30 (4L)", description: null, price: 28500, available: true, brand: "Mobil 1", category: "Lubricantes", image_url: null },
    { id: 7, sku: "MO-002", name: "Bujías de iridio (juego x4)", description: null, price: 24000, available: true, brand: "NGK", category: "Motor", image_url: null },
    { id: 8, sku: "FR-002", name: "Disco de freno ventilado", description: null, price: 32000, available: true, brand: "Brembo", category: "Frenos", image_url: null },
    { id: 9, sku: "FI-002", name: "Filtro de aire", description: null, price: 15500, available: true, brand: "K&N", category: "Filtros", image_url: null },
    { id: 10, sku: "RE-001", name: "Radiador de aluminio", description: null, price: 85000, available: false, brand: "Denso", category: "Refrigeración", image_url: null },
    { id: 11, sku: "TR-001", name: "Kit de embrague completo", description: null, price: 120000, available: true, brand: "LUK", category: "Transmisión", image_url: null },
    { id: 12, sku: "NE-001", name: "Neumático 195/65 R15", description: null, price: 58000, available: true, brand: "Michelin", category: "Neumáticos", image_url: null },
];
