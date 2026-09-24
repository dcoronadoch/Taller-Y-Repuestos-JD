# Taller y Repuestos JD

Sitio web para un taller de mecánica y venta de repuestos automotrices, desarrollado como proyecto del curso **Programación III** — Universidad Nacional, Sede Regional Chorotega, Campus Liberia.

## Entregable

**II Entregable — Front Office funcional: Hooks, Context API y consumo de APIs**
Profesor: Mag. Enrique Gómez Jiménez — II Ciclo 2026

## Tecnologías utilizadas

- **React 19** + **TypeScript**
- **Vite** (herramienta de build y servidor de desarrollo)
- **React Router DOM** (navegación tipo SPA)
- **Context API** (React) para estado compartido
- CSS puro (sin frameworks de estilos)

## Requisitos previos

- [Node.js](https://nodejs.org/) versión 18 o superior
- npm (viene incluido con Node.js)

## Cómo ejecutar el proyecto

1. Clona o descarga este repositorio.
2. Abre una terminal en la carpeta del proyecto.
3. Instala las dependencias:

```bash
   npm install
```

4. Inicia el servidor de desarrollo:

```bash
   npm run dev
```

5. Abre en tu navegador la URL que muestra la terminal (normalmente `http://localhost:5173`).

Para generar una build de producción:

```bash
npm run build
```

## Funcionalidades del Front Office

- **Catálogo de repuestos** con filtros por categoría y marca (`useState`)
- **Detalle de repuesto** por producto (`/repuesto/:id`)
- **Carrito de compras** — agregar, quitar y cambiar cantidades, con contador visible 
- **Favoritos** — marcar/desmarcar repuestos, visibles en su propia sección
- **Formulario de facturación** con datos de envío y opción de retiro en tienda
- **Conversión de moneda en tiempo real** (colones/dólares) en el total del carrito
- Formulario de contacto controlado
- Menú responsive con animación en cascada
- Persistencia del carrito y favoritos en `localStorage`

## Hooks utilizados

- **useState** — carrito, favoritos, filtros del catálogo, formularios, menú móvil, cantidad de producto, estado del tipo de cambio (carga/error)
- **useEffect** — scroll al inicio en cada cambio de ruta, consulta a la API de tipo de cambio, persistencia en `localStorage`
- **useContext** — consumo de `CartContext` y `FavoritesContext` a través de los hooks personalizados `useCart()` y `useFavorites()`
- **useMemo** — optimiza el valor expuesto por `CartContext` y `FavoritesContext`, evitando recrear las funciones del contexto en cada render

### Hooks de React Router

- **useParams** — obtiene el `id` del repuesto desde la URL en la página de detalle
- **useNavigate** — botón "Volver" que regresa a la página anterior real del historial
- **useLocation** — detecta cambios de ruta para hacer scroll al inicio de la página

## Context API

Se implementaron dos contextos, ambos para evitar pasar props manualmente a través de múltiples componentes sin relación directa entre sí:

- **`CartContext`** (`src/context/CartContext.tsx`) — estado del carrito de compras, accesible desde el encabezado, las tarjetas de repuesto, la página de carrito y la página de facturación.
- **`FavoritesContext`** (`src/context/FavoritesContext.tsx`) — estado de repuestos favoritos, accesible desde el encabezado, las tarjetas de repuesto y la página de favoritos.

## API externa consumida

**Frankfurter / BCCR** — `https://api.frankfurter.dev/v2/providers/bccr/rate/usd/crc`

API pública y gratuita (sin llave de acceso) que provee el tipo de cambio dólar-colón publicado por el Banco Central de Costa Rica. Se consume mediante `fetch` dentro de un hook personalizado, `src/hooks/useExchangeRate.ts`, con manejo de estados de carga y error. Este hook se reutiliza en dos páginas: `Carrito.tsx` (para mostrar "Subtotal($)") y `Factura.tsx` (para mostrar "Total($)"), evitando duplicar la lógica de la petición.

## Rutas de la aplicación

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/nosotros` | Nosotros |
| `/servicios` | Servicios |
| `/catalogo` | Catálogo de repuestos |
| `/repuesto/:id` | Detalle de un repuesto |
| `/favoritos` | Repuestos favoritos |
| `/contacto` | Contacto |
| `/carrito` | Carrito de compras |
| `/factura` | Facturación / finalizar compra |

## Alcance de esta entrega

Según lo indicado en el instrumento de evaluación, en esta entrega **no** se implementa backend propio, base de datos, operaciones CRUD ni persistencia en servidor. Los datos de los repuestos son estáticos (`src/data/data.ts`), y el carrito/favoritos solo persisten localmente en el navegador del usuario.