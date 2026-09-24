import pastillasFreno from "../assets/repuestos/pastillas-freno.svg";
import amortiguador from "../assets/repuestos/amortiguador.svg";
import filtroAceite from "../assets/repuestos/filtro-aceite.svg";
import bateria from "../assets/repuestos/bateria.svg";
import correaDistribucion from "../assets/repuestos/correa-distribucion.svg";
import aceiteSintetico from "../assets/repuestos/aceite-sintetico.svg";
import bujias from "../assets/repuestos/bujias.svg";
import discoFreno from "../assets/repuestos/disco-freno.svg";
import filtroAire from "../assets/repuestos/filtro-aire.svg";
import radiador from "../assets/repuestos/radiador.svg";
import kitEmbrague from "../assets/repuestos/kit-embrague.svg";
import neumatico from "../assets/repuestos/neumatico.svg";

export interface Repuesto {
    id: number;
    nombre: string;
    categoria: string;
    marca: string;
    precio: number;
    disponible: boolean;
    imagen: string;
}

export const repuestos: Repuesto[] = [
    { id: 1, nombre: "Pastillas de freno cerámicas", categoria: "Frenos", marca: "Bosch", precio: 18500, disponible: true, imagen: pastillasFreno },
    { id: 2, nombre: "Amortiguador delantero", categoria: "Suspensión", marca: "Monroe", precio: 45000, disponible: true, imagen: amortiguador },
    { id: 3, nombre: "Filtro de aceite", categoria: "Filtros", marca: "Mann Filter", precio: 6500, disponible: true, imagen: filtroAceite },
    { id: 4, nombre: "Batería 12V 650A", categoria: "Baterías", marca: "Duracell", precio: 68000, disponible: false, imagen: bateria },
    { id: 5, nombre: "Correa de distribución", categoria: "Motor", marca: "Gates", precio: 22000, disponible: true, imagen: correaDistribucion },
    { id: 6, nombre: "Aceite sintético 5W-30 (4L)", categoria: "Lubricantes", marca: "Mobil 1", precio: 28500, disponible: true, imagen: aceiteSintetico },
    { id: 7, nombre: "Bujías de iridio (juego x4)", categoria: "Motor", marca: "NGK", precio: 24000, disponible: true, imagen: bujias },
    { id: 8, nombre: "Disco de freno ventilado", categoria: "Frenos", marca: "Brembo", precio: 32000, disponible: true, imagen: discoFreno },
    { id: 9, nombre: "Filtro de aire", categoria: "Filtros", marca: "K&N", precio: 15500, disponible: true, imagen: filtroAire },
    { id: 10, nombre: "Radiador de aluminio", categoria: "Refrigeración", marca: "Denso", precio: 85000, disponible: false, imagen: radiador },
    { id: 11, nombre: "Kit de embrague completo", categoria: "Transmisión", marca: "LUK", precio: 120000, disponible: true, imagen: kitEmbrague },
    { id: 12, nombre: "Neumático 195/65 R15", categoria: "Neumáticos", marca: "Michelin", precio: 58000, disponible: true, imagen: neumatico },
];

export interface CartItem {
    repuesto: Repuesto;
    cantidad: number;
} 