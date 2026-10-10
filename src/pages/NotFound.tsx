import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section className="catalogo">
            <div className="contenedor centrar">
                <h2>404 — Página no encontrada</h2>

                <p>
                    La página que buscas no existe o fue movida. Revisa la
                    dirección o vuelve al inicio.
                </p>

                <br />

                <Link to="/" className="boton">
                    Volver al inicio
                </Link>
            </div>
        </section>
    );
}

export default NotFound;