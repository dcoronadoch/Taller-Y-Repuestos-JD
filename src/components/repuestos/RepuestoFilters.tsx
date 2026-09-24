interface RepuestoFiltersProps {
    categorias: string[];
    marcas: string[];
    categoriaSeleccionada: string;
    marcaSeleccionada: string;
    onCategoriaChange: (valor: string) => void;
    onMarcaChange: (valor: string) => void;
    onLimpiarFiltros: () => void;
}

function RepuestoFilters({
    categorias,
    marcas,
    categoriaSeleccionada,
    marcaSeleccionada,
    onCategoriaChange,
    onMarcaChange,
    onLimpiarFiltros,
}: RepuestoFiltersProps) {
    return (
        <aside className="repuesto-filtros">

            <h2 className="filtros-titulo">Filtrar repuestos</h2>

            <div className="filtro-grupo">
                <label htmlFor="categoria">Categoría</label>

                <select
                    id="categoria"
                    value={categoriaSeleccionada}
                    onChange={(event) => onCategoriaChange(event.target.value)}
                >
                    <option value="">Todas las categorías</option>

                    {categorias.map((categoria) => (
                        <option key={categoria} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filtro-grupo">
                <label htmlFor="marca">Marca</label>

                <select
                    id="marca"
                    value={marcaSeleccionada}
                    onChange={(event) => onMarcaChange(event.target.value)}
                >
                    <option value="">Todas las marcas</option>

                    {marcas.map((marca) => (
                        <option key={marca} value={marca}>
                            {marca}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="button"
                className="boton-limpiar-filtros"
                onClick={onLimpiarFiltros}
            >
                Limpiar filtros
            </button>

        </aside>
    );
}

export default RepuestoFilters;