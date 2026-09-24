import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import Catalogo from "./pages/Catalogo";
import Favoritos from "./pages/Favoritos";
import RepuestoDetalle from "./pages/RepuestoDetalle";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
import Factura from "./pages/Factura";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/servicios" element={<Servicios />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/repuesto/:id" element={<RepuestoDetalle />} />
                    <Route path="/favoritos" element={<Favoritos />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/factura" element={<Factura />} />
                </Routes>
            </main>

            <Footer />
        </BrowserRouter>
    );
}

export default App;