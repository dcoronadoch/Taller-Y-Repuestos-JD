import { useState } from "react";
import { useRepuestos } from "../hooks/useRepuestos";
import RepuestoCard from "../components/repuestos/RepuestoCard";
import RepuestoFilters from "../components/repuestos/RepuestoFilters";

function Catalogo() {
    const { repuestos, cargando, error, recargar } = useRepuestos();

    const categorias = [...new Set(repuestos.map((repuesto) => repuesto.categoria))];
    const marcas = [...new Set(repuestos.map((repuesto) => repuesto.marca))];

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [marcaSeleccionada, setMarcaSeleccionada] = useState("");

    const repuestosFiltrados = repuestos.filter((repuesto) => {
        const coincideCategoria =
            categoriaSeleccionada === "" || repuesto.categoria === categoriaSeleccionada;

        const coincideMarca =
            marcaSeleccionada === "" || repuesto.marca === marcaSeleccionada;

        return coincideCategoria && coincideMarca;
    });

    function limpiarFiltros() {
        setCategoriaSeleccionada("");
        setMarcaSeleccionada("");
    }

    return (
        <section className="catalogo">
            <div className="contenedor">

                <h2>Catálogo de repuestos</h2>

                <p>
                    Consulta nuestra selección de repuestos disponibles para
                    mantenimiento y reparación de tu vehículo.
                </p>

                {cargando ? (
                    <p className="catalogo-sin-resultados" role="status">
                        Cargando repuestos...
                    </p>
                ) : error ? (
                    <div className="centrar" role="alert">
                        <p className="catalogo-sin-resultados">{error}</p>

                        <button type="button" className="boton" onClick={recargar}>
                            Reintentar
                        </button>
                    </div>
                ) : repuestos.length === 0 ? (
                    <p className="catalogo-sin-resultados">
                        Aún no hay repuestos publicados en el catálogo.
                    </p>
                ) : (
                    <div className="catalogo-layout">

                        <RepuestoFilters
                            categorias={categorias}
                            marcas={marcas}
                            categoriaSeleccionada={categoriaSeleccionada}
                            marcaSeleccionada={marcaSeleccionada}
                            onCategoriaChange={setCategoriaSeleccionada}
                            onMarcaChange={setMarcaSeleccionada}
                            onLimpiarFiltros={limpiarFiltros}
                        />

                        <div className="catalogo-resultados">
                            {repuestosFiltrados.length === 0 ? (
                                <p className="catalogo-sin-resultados">
                                    No hay repuestos que coincidan con los filtros seleccionados.
                                </p>
                            ) : (
                                <div className="repuestos-grid">
                                    {repuestosFiltrados.map((repuesto) => (
                                        <RepuestoCard key={repuesto.id} repuesto={repuesto} />
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                )}

            </div>
        </section>
    );
}

export default Catalogo;
