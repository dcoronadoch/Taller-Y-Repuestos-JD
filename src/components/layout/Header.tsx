import { useState } from "react";
import { NavLink } from "react-router-dom";
import logoClaro from "../../assets/logo-jd.png";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { totalItems } = useCart();
    const { favoritosIds } = useFavorites();

    function cerrarMenu() {
        setMenuAbierto(false);
    }

    return (
        <header className="encabezado">
            <div className="contenedor">

                <div className="logo">
                    <span className="logo-imagen-wrap">
                        <img
                            src={logoClaro}
                            alt="Logo Taller y Repuestos JD"
                            className="logo-imagen"
                        />
                    </span>

                    Taller y Repuestos <span>JD</span>
                </div>

                <button
                    className="menu-toggle"
                    aria-label="Abrir menú"
                    onClick={() => setMenuAbierto((abierto) => !abierto)}
                >
                    ☰
                </button>

                <nav className={`menu ${menuAbierto ? "activo" : ""}`}>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) => (isActive ? "activo" : "")}
                                onClick={cerrarMenu}
                            >
                                Inicio
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/catalogo"
                                className={({ isActive }) => (isActive ? "activo" : "")}
                                onClick={cerrarMenu}
                            >
                                Catálogo
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/favoritos"
                                className={({ isActive }) => (isActive ? "activo" : "")}
                                onClick={cerrarMenu}
                            >
                                Favoritos{favoritosIds.length > 0 ? ` (${favoritosIds.length})` : ""}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/carrito"
                                className={({ isActive }) => (isActive ? "activo" : "")}
                                onClick={cerrarMenu}
                            >
                                Carrito{totalItems > 0 ? ` (${totalItems})` : ""}
                            </NavLink>
                        </li>
                    </ul>
                </nav>

            </div>
        </header>
    );
}

export default Header;