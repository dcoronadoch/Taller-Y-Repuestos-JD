import { Link } from "react-router-dom";
import { useRepuestos } from "../hooks/useRepuestos";
import { useFavorites } from "../context/FavoritesContext";
import RepuestoCard from "../components/repuestos/RepuestoCard";

function Favoritos() {
    const { favoritosIds } = useFavorites();
    const { repuestos, cargando, error, recargar } = useRepuestos();

    const repuestosFavoritos = repuestos.filter((repuesto) =>
        favoritosIds.includes(repuesto.id)
    );

    if (favoritosIds.length === 0) {
        return (
            <section className="catalogo">
                <div className="contenedor centrar">
                    <h2>Aún no tienes favoritos</h2>

                    <p>
                        Marca el corazón en cualquier repuesto del catálogo para
                        guardarlo aquí.
                    </p>

                    <br />

                    <Link to="/catalogo" className="boton">
                        Ir al catálogo
                    </Link>
                </div>
            </section>
        );
    }

    if (cargando) {
        return (
            <section className="catalogo">
                <div className="contenedor centrar">
                    <h2>Tus repuestos favoritos</h2>

                    <p className="catalogo-sin-resultados" role="status">
                        Cargando favoritos...
                    </p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="catalogo">
                <div className="contenedor centrar" role="alert">
                    <h2>Tus repuestos favoritos</h2>

                    <p className="catalogo-sin-resultados">{error}</p>

                    <button type="button" className="boton" onClick={recargar}>
                        Reintentar
                    </button>
                </div>
            </section>
        );
    }

    if (repuestosFavoritos.length === 0) {
        return (
            <section className="catalogo">
                <div className="contenedor centrar">
                    <h2>Tus favoritos ya no están disponibles</h2>

                    <p>
                        Los repuestos que marcaste ya no se encuentran en el
                        catálogo.
                    </p>

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

                <h2>Tus repuestos favoritos</h2>

                <p>
                    Los repuestos que has marcado con el corazón aparecen aquí.
                </p>

                <div className="repuestos-grid">
                    {repuestosFavoritos.map((repuesto) => (
                        <RepuestoCard key={repuesto.id} repuesto={repuesto} />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Favoritos;
