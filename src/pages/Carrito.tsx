import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useExchangeRate } from "../hooks/useExchangeRate";

function Carrito() {
    const { carrito, cambiarCantidad, quitarDelCarrito, vaciarCarrito } = useCart();
    const { tipoCambio, cargando: cargandoCambio, error: errorCambio } = useExchangeRate();

    const total = carrito.reduce(
        (suma, item) => suma + item.repuesto.precio * item.cantidad,
        0
    );

    const totalUSD = tipoCambio !== null ? total / tipoCambio : null;

    if (carrito.length === 0) {
        return (
            <section className="catalogo">
                <div className="contenedor centrar">
                    <h2>Tu carrito está vacío</h2>

                    <p>Agrega repuestos desde el catálogo para verlos aquí.</p>

                    <br />

                    <Link to="/catalogo" className="boton">
                        Ir al catálogo
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="catalogo">
            <div className="contenedor">

                <h2>Tu carrito</h2>

                <div className="carrito-layout">

                    <div className="carrito-productos">

                        <div className="carrito-tabla-encabezado">
                            <span>Producto</span>
                            <span>Precio</span>
                            <span>Cantidad</span>
                            <span>Subtotal</span>
                            <span></span>
                        </div>

                        <div className="carrito-lista">
                            {carrito.map((item) => (
                                <article key={item.repuesto.id} className="carrito-item">

                                    <div className="carrito-item-producto">
                                        <img
                                            src={item.repuesto.imagen}
                                            alt={item.repuesto.nombre}
                                            className="carrito-item-imagen"
                                        />

                                        <h3>{item.repuesto.nombre}</h3>
                                    </div>

                                    <p className="carrito-item-precio" data-label="Precio">
                                        ₡{item.repuesto.precio.toLocaleString("es-CR")}
                                    </p>

                                    <div className="carrito-item-cantidad" data-label="Cantidad">
                                        <button
                                            onClick={() =>
                                                cambiarCantidad(item.repuesto.id, item.cantidad - 1)
                                            }
                                        >
                                            −
                                        </button>

                                        <span>{item.cantidad}</span>

                                        <button
                                            onClick={() =>
                                                cambiarCantidad(item.repuesto.id, item.cantidad + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className="carrito-item-subtotal" data-label="Subtotal">
                                        ₡{(item.repuesto.precio * item.cantidad).toLocaleString("es-CR")}
                                    </p>

                                    <button
                                        className="carrito-item-quitar"
                                        onClick={() => quitarDelCarrito(item.repuesto.id)}
                                        aria-label="Quitar del carrito"
                                        title="Quitar del carrito"
                                    >
                                        ×
                                    </button>

                                </article>
                            ))}
                        </div>

                        <button className="boton-secundario" onClick={vaciarCarrito}>
                            Vaciar carrito
                        </button>

                    </div>

                    <aside className="carrito-resumen-lateral">
                        <h3>Resumen</h3>

                        <div className="carrito-resumen-linea">
                            <span>Subtotal</span>
                            <span>₡{total.toLocaleString("es-CR")}</span>
                        </div>

                        <div className="carrito-resumen-linea">
                            <span>Subtotal($)</span>
                            <span>
                                {cargandoCambio && "Calculando..."}
                                {!cargandoCambio && errorCambio && "No disponible"}
                                {!cargandoCambio && !errorCambio && totalUSD !== null &&
                                    `US$ ${totalUSD.toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
                            </span>
                        </div>

                        <div className="carrito-resumen-total">
                            <span>Total</span>
                            <span>₡{total.toLocaleString("es-CR")}</span>
                        </div>

                        <Link to="/factura" className="boton carrito-resumen-boton">
                            Finalizar compra
                        </Link>
                    </aside>

                </div>

            </div>
        </section>
    );
}

export default Carrito;