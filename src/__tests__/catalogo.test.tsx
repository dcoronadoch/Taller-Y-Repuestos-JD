import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "../test/utils";

describe("Catálogo de repuestos", () => {
    it("muestra los 12 repuestos del catálogo", () => {
        renderApp("/catalogo");

        expect(screen.getAllByRole("link", { name: "Ver información" })).toHaveLength(12);
    });

    it("filtrar por categoría deja solo los repuestos de esa categoría", async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        await user.selectOptions(screen.getByLabelText("Categoría"), "Frenos");

        expect(screen.getAllByRole("link", { name: "Ver información" })).toHaveLength(2);
        expect(screen.getByText("Pastillas de freno cerámicas")).toBeInTheDocument();
        expect(screen.getByText("Disco de freno ventilado")).toBeInTheDocument();
        expect(screen.queryByText("Filtro de aceite")).not.toBeInTheDocument();
    });

    it("combinar categoría y marca sin coincidencias muestra un mensaje", async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        await user.selectOptions(screen.getByLabelText("Categoría"), "Frenos");
        await user.selectOptions(screen.getByLabelText("Marca"), "Michelin");

        expect(
            screen.getByText("No hay repuestos que coincidan con los filtros seleccionados.")
        ).toBeInTheDocument();
    });

    it('"Limpiar filtros" restablece el catálogo completo', async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        await user.selectOptions(screen.getByLabelText("Categoría"), "Frenos");
        await user.click(screen.getByRole("button", { name: "Limpiar filtros" }));

        expect(screen.getAllByRole("link", { name: "Ver información" })).toHaveLength(12);
    });
});