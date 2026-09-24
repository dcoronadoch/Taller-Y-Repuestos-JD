import { Link } from "react-router-dom";
import type { Repuesto } from "../../data/data";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

interface RepuestoCardProps {
    repuesto: Repuesto;
}

function RepuestoCard({ repuesto }: RepuestoCardProps) {
    const { agregarAlCarrito } = useCart();
    const { esFavorito, alternarFavorito } = useFavorites();
    const favorito = esFavorito(repuesto.id);

    return (
        <article className="repuesto-card">

            <div className="repuesto-imagen">
                <button
                    type="button"
                    className={`boton-favorito ${favorito ? "es-favorito" : ""}`}
                    onClick={() => alternarFavorito(repuesto.id)}
                    aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                    title={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                    ♥
                </button>

                <img src={repuesto.imagen} alt={repuesto.nombre} />

                {!repuesto.disponible && (
                    <span className="etiqueta-agotado">Agotado</span>
                )}
            </div>

            <div className="repuesto-info">
                <h3>{repuesto.nombre}</h3>

                <p>
                    <strong>Categoría:</strong> {repuesto.categoria}
                </p>

                <p>
                    <strong>Marca:</strong> {repuesto.marca}
                </p>

                <p className="repuesto-precio">
                    ₡{repuesto.precio.toLocaleString("es-CR")}
                </p>

                <div className="repuesto-botones">
                    <Link to={`/repuesto/${repuesto.id}`} className="boton-accion boton-ver-info">
                        Ver información
                    </Link>

                    <button
                        className="boton-accion boton-agregar"
                        onClick={() => agregarAlCarrito(repuesto)}
                        disabled={!repuesto.disponible}
                    >
                        {repuesto.disponible ? "Agregar al carrito" : "No disponible"}
                    </button>
                </div>
            </div>

        </article>
    );
}

export default RepuestoCard;