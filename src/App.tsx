import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Favoritos from "./pages/Favoritos";
import RepuestoDetalle from "./pages/RepuestoDetalle";
import Carrito from "./pages/Carrito";
import Factura from "./pages/Factura";
import NotFound from "./pages/NotFound";
import "./App.css";


function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/repuesto/:id" element={<RepuestoDetalle />} />
                    <Route path="/favoritos" element={<Favoritos />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/factura" element={<Factura />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />
        </BrowserRouter>
    );
}

export default App;