import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useExchangeRate } from "../hooks/useExchangeRate";

interface DatosEnvio {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    direccion: string;
}

function Factura() {
    const { carrito, totalItems, vaciarCarrito } = useCart();
    const { tipoCambio, cargando: cargandoCambio, error: errorCambio } = useExchangeRate();

    const total = carrito.reduce(
        (suma, item) => suma + item.repuesto.precio * item.cantidad,
        0
    );

    const totalUSD = tipoCambio !== null ? total / tipoCambio : null;

    const [datos, setDatos] = useState<DatosEnvio>({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        direccion: "",
    });

    const [retiroEnTienda, setRetiroEnTienda] = useState(false);
    const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

    function manejarCambio(e: ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setDatos((anterior) => ({ ...anterior, [id]: value }));
    }

    function manejarRetiroEnTienda(e: ChangeEvent<HTMLInputElement>) {
        const marcado = e.target.checked;
        setRetiroEnTienda(marcado);

        if (marcado) {
            setDatos((anterior) => ({ ...anterior, direccion: "" }));
        }
    }

    function manejarEnvio(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setPedidoConfirmado(true);
        vaciarCarrito();
    }

    if (pedidoConfirmado) {
        return (
            <section className="catalogo">
                <div className="contenedor centrar">
                    <h2>¡Gracias por tu compra, {datos.nombre}!</h2>

                    <p>
                        Un asesor se pondrá en contacto al {datos.telefono} para
                        coordinar {retiroEnTienda ? "el retiro en tienda" : "la entrega"}.
                    </p>

                    <br />

                    <Link to="/catalogo" className="boton">
                        Volver al catálogo
                    </Link>
                </div>
            </section>
        );
    }

    if (carrito.length === 0) {
        return (
            <section className="catalogo">
                <div className="contenedor centrar">
                    <h2>No tienes productos para facturar</h2>

                    <p>Agrega repuestos desde el catálogo antes de continuar.</p>

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

                <h2>Finalizar compra</h2>

                <form className="carrito-layout" onSubmit={manejarEnvio}>

                    <div className="carrito-productos factura-formulario">

                        <h3>Datos de envío</h3>

                        <div className="grupo">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                value={datos.nombre}
                                onChange={manejarCambio}
                                required
                            />
                        </div>

                        <div className="grupo">
                            <label htmlFor="apellido">Apellido</label>
                            <input
                                type="text"
                                id="apellido"
                                value={datos.apellido}
                                onChange={manejarCambio}
                                required
                            />
                        </div>

                        <div className="grupo">
                            <label htmlFor="correo">Correo electrónico</label>
                            <input
                                type="email"
                                id="correo"
                                value={datos.correo}
                                onChange={manejarCambio}
                                required
                            />
                        </div>

                        <div className="grupo">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="tel"
                                id="telefono"
                                value={datos.telefono}
                                onChange={manejarCambio}
                                required
                            />
                        </div>

                        <label className="factura-checkbox">
                            <input
                                type="checkbox"
                                checked={retiroEnTienda}
                                onChange={manejarRetiroEnTienda}
                            />
                            Deseo pasar a recoger el producto en tienda
                        </label>

                        <div className="grupo">
                            <label htmlFor="direccion">Dirección de envío</label>
                            <input
                                type="text"
                                id="direccion"
                                value={datos.direccion}
                                onChange={manejarCambio}
                                disabled={retiroEnTienda}
                                placeholder={
                                    retiroEnTienda
                                        ? "No aplica — retiro en tienda"
                                        : "Provincia, cantón, distrito, señas exactas"
                                }
                                required={!retiroEnTienda}
                            />
                        </div>

                    </div>

                    <aside className="carrito-resumen-lateral">
                        <h3>Resumen del pedido</h3>

                        <div className="factura-productos">
                            {carrito.map((item) => (
                                <div key={item.repuesto.id} className="factura-producto">
                                    <img src={item.repuesto.imagen} alt={item.repuesto.nombre} />

                                    <div className="factura-producto-info">
                                        <p>{item.repuesto.nombre}</p>
                                        <span>Cantidad: {item.cantidad}</span>
                                    </div>

                                    <p className="factura-producto-subtotal">
                                        ₡{(item.repuesto.precio * item.cantidad).toLocaleString("es-CR")}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="carrito-resumen-linea">
                            <span>Productos ({totalItems})</span>
                            <span>₡{total.toLocaleString("es-CR")}</span>
                        </div>

                        <div className="carrito-resumen-total">
                            <span>Total</span>
                            <span>₡{total.toLocaleString("es-CR")}</span>
                        </div>

                        <div className="carrito-resumen-total-usd">
                            <span>Total($)</span>
                            <span>
                                {cargandoCambio && "Calculando..."}
                                {!cargandoCambio && errorCambio && "No disponible"}
                                {!cargandoCambio && !errorCambio && totalUSD !== null &&
                                    `US$ ${totalUSD.toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
                            </span>
                        </div>

                        <button type="submit" className="boton carrito-resumen-boton">
                            Pagar
                        </button>
                    </aside>

                </form>

            </div>
        </section>
    );
}

export default Factura;