# Taller y Repuestos JD

Sitio web para un taller de mecánica y venta de repuestos automotrices, desarrollado como proyecto del curso **Programación III** — Universidad Nacional, Sede Regional Chorotega, Campus Liberia.

## Entregable

**IV Entregable — CRUD + Backend (Express y MySQL)**
Profesor: Mag. Enrique Gómez Jiménez — II Ciclo 2026

Este entregable conecta el Front Office con el backend propio del proyecto: los repuestos ya no están escritos en el código, sino que se consultan a una API REST (Node.js + Express) que lee una base de datos MySQL. Los repuestos, marcas y categorías se administran desde el **Backoffice** (CRUD completo) y el Front Office muestra el catálogo publicado.

Proyectos relacionados: `taller-jd-backend` (API REST + MySQL), `taller-jd-backoffice` (administración) y `taller-jd-setup` (creación del primer administrador).

## Repositorio

El código fuente de este proyecto se encuentra alojado en GitHub:
🔗 [Taller-Y-Repuestos-JD-TS](https://github.com/bztrr5tzhs-maker/Taller-Y-Repuestos-JD-TS)

## Tecnologías utilizadas

- **React 19** + **TypeScript**
- **Vite** (herramienta de build y servidor de desarrollo)
- **React Router DOM** (SPA y navegación entre vistas)
- **Context API** (React) para estado compartido
- **API REST propia** (Node.js + Express + MySQL), consumida con `fetch`
- **Vitest** + **React Testing Library** (pruebas automatizadas)
- CSS puro (sin frameworks de estilos)

## Requisitos previos

- [Node.js](https://nodejs.org/) versión **22.12 o superior** (requerido por Vite y Vitest)
- npm (viene incluido con Node.js)
- El **backend** (`taller-jd-backend`) en ejecución y con su base de datos MySQL: sin él el catálogo no puede cargar los repuestos

## Instalación y ejecución

1. Clona o descarga este repositorio.
2. Abre una terminal en la carpeta del proyecto.
3. Instala las dependencias:

```bash
npm install
```

4. Crea el archivo `.env` a partir de `.env.example` e indica la URL del backend:

```bash
VITE_API_URL=http://localhost:3000
```

5. Inicia el backend (en su propia carpeta y terminal) con `npm run dev`.
6. Inicia el servidor de desarrollo del Front Office:

```bash
npm run dev
```

7. Abre en tu navegador `http://localhost:5174`. El puerto está fijo en `vite.config.ts` (el Backoffice usa el 5173) y el backend debe permitirlo en la variable `FRONTEND_URLS` de su CORS.

Para generar una build de producción:

```bash
npm run build
```

## Cómo ejecutar las pruebas

```bash
npm test
```

Ejecuta todas las pruebas una vez y muestra el resumen de aprobadas y fallidas. Otras opciones:

```bash
npx vitest run --reporter=verbose   # lista cada prueba por nombre
npm run test:watch                  # modo observador: se re-ejecutan al guardar cambios
```

## Estructura del proyecto

```
src/
├─ __tests__/        Pruebas automatizadas
├─ assets/           Imágenes del sitio e imagen de respaldo (sin-imagen.svg)
├─ components/
│  ├─ layout/        Header, Footer, ScrollToTop
│  └─ repuestos/     RepuestoCard, RepuestoFilters
├─ config/           api.ts (URL base del backend)
├─ context/          CartContext, FavoritesContext
├─ data/             Tipos Repuesto y CartItem
├─ hooks/            useRepuestos / useRepuesto (backend), useExchangeRate (API externa)
├─ pages/            Una página por ruta
├─ services/         repuestos.service.ts (peticiones al backend)
├─ test/             Configuración y utilidades de las pruebas
├─ App.tsx           Definición de las rutas
└─ main.tsx          Punto de entrada y Providers
```

## SPA y React Router

La aplicación funciona como una SPA: el navegador carga una sola página y React Router cambia la vista según la URL, sin recargas completas.

- El enrutador (`BrowserRouter`) y las rutas (`Routes` / `Route`) se definen en `src/App.tsx`.
- El encabezado y el pie de página quedan fuera de `Routes`, por lo que permanecen fijos mientras cambia solo el contenido.
- **Navegación con enlaces:** `NavLink` en el menú (resalta la ruta activa) y `Link` en botones, tarjetas y migas de pan.
- **Parámetros de ruta:** `/repuesto/:id` se lee con `useParams` en la página de detalle.
- **Navegación programática:** `useNavigate` en el botón "Volver", que regresa a la página anterior del historial.
- **Ruta no reconocida:** la ruta comodín `*` muestra la página 404 (`NotFound.tsx`), con un enlace para volver al inicio.

### Rutas de la aplicación

| Ruta | Vista / componente | Propósito |
|---|---|---|
| `/` | `Inicio.tsx` | Presentar el taller y dar acceso rápido al catálogo |
| `/catalogo` | `Catalogo.tsx` | Listar los repuestos del backend con filtros por categoría y marca |
| `/repuesto/:id` | `RepuestoDetalle.tsx` | Consultar un repuesto al backend (parámetro de ruta) y agregarlo al carrito |
| `/favoritos` | `Favoritos.tsx` | Mostrar los repuestos marcados como favoritos |
| `/carrito` | `Carrito.tsx` | Gestionar cantidades y ver el total en colones y dólares |
| `/factura` | `Factura.tsx` | Capturar datos de envío o retiro en tienda y confirmar el pedido |
| `*` | `NotFound.tsx` | Responder con una página 404 ante una ruta no reconocida |

## Pruebas automatizadas

Se usan **Vitest** (ejecutor de pruebas, integrado con Vite) y **React Testing Library** (verifica lo que el usuario ve y hace). Cada prueba monta la aplicación completa con sus Providers en una ruta concreta, simula acciones del usuario (clics, selección de filtros, escritura en formularios) y comprueba el resultado visible en pantalla.

Las dos APIs se **simulan** en las pruebas (`src/test/api-simulada.ts`): el catálogo responde con repuestos de prueba (`src/test/fixtures.ts`) y el tipo de cambio con 1 USD = ₡500. Así son reproducibles y no dependen de internet ni del backend.

En total hay **25 pruebas** en 4 archivos:

| Archivo | Pruebas | Qué verifica |
|---|---|---|
| `navegacion.test.tsx` | 7 | Navegación del menú sin recarga, ruta con parámetro (válido, inexistente y no numérico), página 404 y regreso al inicio |
| `catalogo.test.tsx` | 6 | Repuestos que devuelve la API, estado de carga, error con reintento, filtro por categoría, combinación sin resultados y limpieza de filtros |
| `contexto.test.tsx` | 5 | Contador del carrito, persistencia en `localStorage`, descarte del formato anterior, favoritos y página de favoritos vacía |
| `carrito-factura.test.tsx` | 7 | Carrito vacío, total en dólares con la API, estado de carga, error de la API, recálculo al cambiar cantidad y casilla de retiro en tienda de la factura |

### Pruebas representativas

| Prueba | Componente / funcionalidad | Resultado esperado |
|---|---|---|
| Navegación por el menú sin recarga | `Header` + React Router | Al hacer clic en "Catálogo", la URL cambia a `/catalogo` y se muestra el catálogo |
| Ruta con parámetro | `RepuestoDetalle` | `/repuesto/2` consulta la API y muestra "Amortiguador delantero"; `/repuesto/999` muestra "Repuesto no encontrado" |
| Consumo del backend | `Catalogo` + `useRepuestos` | Muestra "Cargando repuestos...", luego la lista; si la API falla, muestra el error y el botón "Reintentar" |
| Ruta no reconocida | `NotFound` | Una URL inexistente muestra la página 404 y "Volver al inicio" regresa a `/` |
| Filtros del catálogo | `Catalogo` + `RepuestoFilters` | Filtrar por "Frenos" deja 2 repuestos; una combinación sin coincidencias muestra un mensaje |
| Contador del carrito | `CartContext` + `Header` | Al agregar un repuesto, el menú muestra "Carrito (1)" |
| Consumo de la API | `Carrito` + `useExchangeRate` | Muestra "Calculando...", luego el subtotal en US$; si la API falla, muestra "No disponible" |
| Retiro en tienda | `Factura` | Al marcar la casilla, el campo de dirección se deshabilita y se vacía |

## Funcionalidades del Front Office

- **Catálogo de repuestos** obtenido del backend, con filtros por categoría y marca (`useState`) y estados de carga y error
- **Detalle de repuesto** por producto (`/repuesto/:id`), con descripción
- **Imagen de respaldo** cuando un repuesto no tiene imagen o su URL no carga
- **Carrito de compras** — agregar, quitar y cambiar cantidades, con contador visible en el menú
- **Favoritos** — marcar/desmarcar repuestos, visibles en su propia sección
- **Formulario de facturación** con datos de envío y opción de retiro en tienda
- **Conversión de moneda en tiempo real** (colones/dólares) en el carrito y la factura
- **Página 404** para rutas no reconocidas
- Menú responsive con animación en cascada
- Persistencia del carrito y favoritos en `localStorage`

## Hooks utilizados

- **useState** — carrito, favoritos, filtros del catálogo, formularios, menú móvil, cantidad de producto, estado del tipo de cambio (carga/error)
- **useEffect** — scroll al inicio en cada cambio de ruta, consultas al backend y a la API de tipo de cambio, persistencia en `localStorage`
- **Hooks personalizados** — `useRepuestos` y `useRepuesto` (consultas al backend con carga, error y reintento) y `useExchangeRate`
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

## Conexión con el backend

El Front Office consume rutas **públicas y de solo lectura** del backend (no requieren iniciar sesión y solo devuelven repuestos activos, cuya marca y categoría también estén activas):

| Método y ruta | Uso en el Front Office | Respuesta |
|---|---|---|
| `GET /api/catalog/parts` | Catálogo y favoritos | Lista de repuestos publicados |
| `GET /api/catalog/parts/:id` | Detalle del repuesto | El repuesto con sus imágenes, o 404 si no existe o no está publicado |

Las peticiones están en `src/services/repuestos.service.ts`, que también traduce los nombres del backend (`name`, `price`, `brand`...) a los del Front Office (`nombre`, `precio`, `marca`...). La URL base sale de `VITE_API_URL`.

La creación, edición y desactivación de repuestos, marcas y categorías se hace en el Backoffice con rutas protegidas por JWT; el Front Office no puede modificar datos.

**Carrito y favoritos:** como los repuestos ya no están en el código, el carrito guarda en `localStorage` una copia del repuesto (nombre, precio, imagen). Un carrito guardado con el formato anterior se descarta automáticamente.

## API externa consumida

**Frankfurter / BCCR** — `https://api.frankfurter.dev/v2/providers/bccr/rate/usd/crc`

API pública y gratuita (sin llave de acceso) que provee el tipo de cambio dólar-colón publicado por el Banco Central de Costa Rica. Se consume mediante `fetch` dentro de un hook personalizado, `src/hooks/useExchangeRate.ts`, con manejo de estados de carga y error. Este hook se reutiliza en dos páginas: `Carrito.tsx` (para mostrar "Subtotal($)") y `Factura.tsx` (para mostrar "Total($)"), evitando duplicar la lógica de la petición.

## Alcance de esta entrega

Los repuestos, marcas y categorías se almacenan en MySQL y se gestionan desde el Backoffice (CRUD) a través del backend. El carrito, los favoritos y la facturación siguen siendo del lado del cliente: el carrito y los favoritos se guardan solo en el navegador y la confirmación de compra no se envía al servidor. Los precios del carrito son los vigentes al momento de agregar el repuesto. El despliegue completo corresponde al siguiente entregable.