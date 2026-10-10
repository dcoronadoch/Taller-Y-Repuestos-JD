# Taller y Repuestos JD

Sitio web para un taller de mecánica y venta de repuestos automotrices, desarrollado como proyecto del curso **Programación III** — Universidad Nacional, Sede Regional Chorotega, Campus Liberia.

## Entregable

**III Entregable — SPA, React Router y Testing**
Profesor: Mag. Enrique Gómez Jiménez — II Ciclo 2026

Este entregable evoluciona el Front Office de los entregables anteriores: se consolida la estructura de aplicación de página única (SPA) con React Router, se agrega una respuesta para rutas no reconocidas y se incorporan pruebas automatizadas.

## Repositorio

El código fuente de este proyecto se encuentra alojado en GitHub:
🔗 [Taller-Y-Repuestos-JD-TS](https://github.com/bztrr5tzhs-maker/Taller-Y-Repuestos-JD-TS)

## Tecnologías utilizadas

- **React 19** + **TypeScript**
- **Vite** (herramienta de build y servidor de desarrollo)
- **React Router DOM** (SPA y navegación entre vistas)
- **Context API** (React) para estado compartido
- **Vitest** + **React Testing Library** (pruebas automatizadas)
- CSS puro (sin frameworks de estilos)

## Requisitos previos

- [Node.js](https://nodejs.org/) versión **22.12 o superior** (requerido por Vite y Vitest)
- npm (viene incluido con Node.js)

## Instalación y ejecución

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
├─ assets/           Imágenes del sitio
├─ components/
│  ├─ layout/        Header, Footer, ScrollToTop
│  └─ repuestos/     RepuestoCard, RepuestoFilters
├─ context/          CartContext, FavoritesContext
├─ data/             Datos estáticos de los repuestos
├─ hooks/            useExchangeRate (consumo de la API)
├─ pages/            Una página por ruta
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
| `/nosotros` | `Nosotros.tsx` | Mostrar historia, misión, visión y valores |
| `/servicios` | `Servicios.tsx` | Describir los servicios y el proceso de trabajo |
| `/catalogo` | `Catalogo.tsx` | Listar los repuestos con filtros por categoría y marca |
| `/repuesto/:id` | `RepuestoDetalle.tsx` | Mostrar el detalle de un repuesto (parámetro de ruta) y agregarlo al carrito |
| `/favoritos` | `Favoritos.tsx` | Mostrar los repuestos marcados como favoritos |
| `/contacto` | `Contacto.tsx` | Formulario de contacto y ubicación del taller |
| `/carrito` | `Carrito.tsx` | Gestionar cantidades y ver el total en colones y dólares |
| `/factura` | `Factura.tsx` | Capturar datos de envío o retiro en tienda y confirmar el pedido |
| `*` | `NotFound.tsx` | Responder con una página 404 ante una ruta no reconocida |

## Pruebas automatizadas

Se usan **Vitest** (ejecutor de pruebas, integrado con Vite) y **React Testing Library** (verifica lo que el usuario ve y hace). Cada prueba monta la aplicación completa con sus Providers en una ruta concreta, simula acciones del usuario (clics, selección de filtros, escritura en formularios) y comprueba el resultado visible en pantalla.

La API de tipo de cambio se **simula** en las pruebas (1 USD = ₡500), de modo que son reproducibles y no dependen de internet.

En total hay **21 pruebas** en 4 archivos:

| Archivo | Pruebas | Qué verifica |
|---|---|---|
| `navegacion.test.tsx` | 6 | Navegación del menú sin recarga, ruta con parámetro (válido e inexistente), página 404 y regreso al inicio |
| `catalogo.test.tsx` | 4 | Renderizado de los 12 repuestos, filtro por categoría, combinación sin resultados y limpieza de filtros |
| `contexto.test.tsx` | 4 | Contador del carrito, persistencia en `localStorage`, favoritos y página de favoritos vacía |
| `carrito-factura.test.tsx` | 7 | Carrito vacío, total en dólares con la API, estado de carga, error de la API, recálculo al cambiar cantidad y casilla de retiro en tienda de la factura |

### Pruebas representativas

| Prueba | Componente / funcionalidad | Resultado esperado |
|---|---|---|
| Navegación por el menú sin recarga | `Header` + React Router | Al hacer clic en "Catálogo", la URL cambia a `/catalogo` y se muestra el catálogo |
| Ruta con parámetro | `RepuestoDetalle` | `/repuesto/2` muestra "Amortiguador delantero"; `/repuesto/999` muestra "Repuesto no encontrado" |
| Ruta no reconocida | `NotFound` | Una URL inexistente muestra la página 404 y "Volver al inicio" regresa a `/` |
| Filtros del catálogo | `Catalogo` + `RepuestoFilters` | Filtrar por "Frenos" deja 2 repuestos; una combinación sin coincidencias muestra un mensaje |
| Contador del carrito | `CartContext` + `Header` | Al agregar un repuesto, el menú muestra "Carrito (1)" |
| Consumo de la API | `Carrito` + `useExchangeRate` | Muestra "Calculando...", luego el subtotal en US$; si la API falla, muestra "No disponible" |
| Retiro en tienda | `Factura` | Al marcar la casilla, el campo de dirección se deshabilita y se vacía |

## Funcionalidades del Front Office

- **Catálogo de repuestos** con filtros por categoría y marca (`useState`)
- **Detalle de repuesto** por producto (`/repuesto/:id`)
- **Carrito de compras** — agregar, quitar y cambiar cantidades, con contador visible en el menú
- **Favoritos** — marcar/desmarcar repuestos, visibles en su propia sección
- **Formulario de facturación** con datos de envío y opción de retiro en tienda
- **Conversión de moneda en tiempo real** (colones/dólares) en el carrito y la factura
- **Página 404** para rutas no reconocidas
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

## Alcance de esta entrega

Según lo indicado en el instrumento de evaluación, en esta entrega **no** se implementa backend propio, base de datos, operaciones CRUD, autenticación con backend ni despliegue. Los datos de los repuestos son estáticos (`src/data/data.ts`), y el carrito y los favoritos solo persisten localmente en el navegador del usuario.