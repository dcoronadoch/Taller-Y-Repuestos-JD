import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "../test/utils";
import { simularApi } from "../test/api-simulada";

describe("Catálogo de repuestos", () => {
    it("muestra los 12 repuestos que devuelve la API", async () => {
        renderApp("/catalogo");

        expect(await screen.findAllByRole("link", { name: "Ver información" })).toHaveLength(12);
    });

    it("mientras la API responde muestra el estado de carga", () => {
        renderApp("/catalogo");

        expect(screen.getByText("Cargando repuestos...")).toBeInTheDocument();
    });

    it("si la API falla muestra el error y permite reintentar", async () => {
        const user = userEvent.setup();
        simularApi({ catalogo: "error" });
        renderApp("/catalogo");

        expect(
            await screen.findByText("No fue posible consultar el catálogo.")
        ).toBeInTheDocument();

        simularApi(); // el servidor vuelve a responder
        await user.click(screen.getByRole("button", { name: "Reintentar" }));

        expect(await screen.findAllByRole("link", { name: "Ver información" })).toHaveLength(12);
    });

    it("filtrar por categoría deja solo los repuestos de esa categoría", async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        await user.selectOptions(await screen.findByLabelText("Categoría"), "Frenos");

        expect(screen.getAllByRole("link", { name: "Ver información" })).toHaveLength(2);
        expect(screen.getByText("Pastillas de freno cerámicas")).toBeInTheDocument();
        expect(screen.getByText("Disco de freno ventilado")).toBeInTheDocument();
        expect(screen.queryByText("Filtro de aceite")).not.toBeInTheDocument();
    });

    it("combinar categoría y marca sin coincidencias muestra un mensaje", async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        await user.selectOptions(await screen.findByLabelText("Categoría"), "Frenos");
        await user.selectOptions(screen.getByLabelText("Marca"), "Michelin");

        expect(
            screen.getByText("No hay repuestos que coincidan con los filtros seleccionados.")
        ).toBeInTheDocument();
    });

    it('"Limpiar filtros" restablece el catálogo completo', async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        await user.selectOptions(await screen.findByLabelText("Categoría"), "Frenos");
        await user.click(screen.getByRole("button", { name: "Limpiar filtros" }));

        expect(screen.getAllByRole("link", { name: "Ver información" })).toHaveLength(12);
    });
});
