import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { repuestos } from "../data/data";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";


function RepuestoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { agregarAlCarrito } = useCart();
    const { esFavorito, alternarFavorito } = useFavorites();
    

    const repuesto = repuestos.find((r) => r.id === Number(id));

    const [cantidad, setCantidad] = useState(1);

    if (!repuesto) {
        return (
            <section className="catalogo">
                <div className="contenedor centrar">
                    <h2>Repuesto no encontrado</h2>

                    <p>El repuesto que buscas no existe o fue removido.</p>

                    <br />

                                            <button
                            type="button"
                            className="detalle-repuesto-volver"
                            onClick={() => navigate(-1)}
                        >
                            ← Volver
                        </button>
                </div>
            </section>
        );
    }

    const favorito = esFavorito(repuesto.id);

    return (
        <section className="detalle-repuesto">
            <div className="contenedor">

                <nav className="migas-pan" aria-label="Ruta de navegación">
                    <Link to="/">Inicio</Link>
                    {" / "}
                    <Link to="/catalogo">Catálogo</Link>
                    {" / "}
                    <span>{repuesto.nombre}</span>
                </nav>

                <div className="detalle-repuesto-layout">

                    <div className="detalle-repuesto-imagen">
                        <img src={repuesto.imagen} alt={repuesto.nombre} />

                        {!repuesto.disponible && (
                            <span className="etiqueta-agotado">Agotado</span>
                        )}
                    </div>

                    <div className="detalle-repuesto-info">

                        <div className="detalle-repuesto-encabezado">
                            <span className="detalle-repuesto-marca">{repuesto.marca}</span>

                            <button
                                type="button"
                                className={`boton-favorito-detalle ${favorito ? "es-favorito" : ""}`}
                                onClick={() => alternarFavorito(repuesto.id)}
                                aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                            >
                                ♥
                            </button>
                        </div>

                        <h1>{repuesto.nombre}</h1>

                        <ul className="detalle-repuesto-especificaciones">
                            <li><strong>Categoría:</strong> {repuesto.categoria}</li>
                            <li><strong>Marca:</strong> {repuesto.marca}</li>
                            <li>
                                <strong>Disponibilidad:</strong>{" "}
                                {repuesto.disponible ? "En stock" : "Agotado"}
                            </li>
                        </ul>

                        <p className="detalle-repuesto-precio">
                            ₡{repuesto.precio.toLocaleString("es-CR")}
                        </p>

                        <div className="detalle-repuesto-acciones">
                            <div className="carrito-item-cantidad">
                                <button
                                    onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                                >
                                    −
                                </button>

                                <span>{cantidad}</span>

                                <button onClick={() => setCantidad((c) => c + 1)}>
                                    +
                                </button>
                            </div>

                            <button
                                className="boton-accion boton-agregar detalle-repuesto-boton"
                                onClick={() => agregarAlCarrito(repuesto, cantidad)}
                                disabled={!repuesto.disponible}
                            >
                                {repuesto.disponible ? "Agregar al carrito" : "No disponible"}
                            </button>
                        </div>

                                                <button
                            type="button"
                            className="detalle-repuesto-volver"
                            onClick={() => navigate(-1)}
                        >
                            ← Volver
                        </button>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default RepuestoDetalle;