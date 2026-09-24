import { Link } from "react-router-dom";
import { repuestos } from "../data/data";
import { useFavorites } from "../context/FavoritesContext";
import RepuestoCard from "../components/repuestos/RepuestoCard";

function Favoritos() {
    const { favoritosIds } = useFavorites();

    const repuestosFavoritos = repuestos.filter((repuesto) =>
        favoritosIds.includes(repuesto.id)
    );

    if (repuestosFavoritos.length === 0) {
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