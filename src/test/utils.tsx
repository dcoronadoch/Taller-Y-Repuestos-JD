import { render } from "@testing-library/react";
import App from "../App";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";

// Renderiza la aplicación completa (con sus Providers, igual que main.tsx)
// posicionada en la ruta indicada.
export function renderApp(ruta = "/") {
    window.history.pushState({}, "", ruta);

    return render(
        <FavoritesProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </FavoritesProvider>
    );
}