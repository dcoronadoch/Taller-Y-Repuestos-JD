import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "../test/utils";

describe("Navegación SPA y React Router", () => {
    it("el menú navega a otra vista sin recargar la página", async () => {
        const user = userEvent.setup();
        renderApp("/");

        await user.click(screen.getByRole("link", { name: "Catálogo" }));

        expect(window.location.pathname).toBe("/catalogo");
        expect(
            screen.getByRole("heading", { name: "Catálogo de repuestos" })
        ).toBeInTheDocument();
    });

    it('"Ver información" lleva al detalle del repuesto usando el parámetro :id', async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        // La primera tarjeta es "Pastillas de freno cerámicas" (id 1)
        await user.click((await screen.findAllByRole("link", { name: "Ver información" }))[0]);

        expect(window.location.pathname).toBe("/repuesto/1");
        expect(
            await screen.findByRole("heading", { level: 1, name: "Pastillas de freno cerámicas" })
        ).toBeInTheDocument();
    });

    it("una ruta con parámetro válido muestra el repuesto que devuelve la API", async () => {
        renderApp("/repuesto/2");

        expect(
            await screen.findByRole("heading", { level: 1, name: "Amortiguador delantero" })
        ).toBeInTheDocument();
        expect(screen.getByText("Amortiguador hidráulico para eje delantero.")).toBeInTheDocument();
    });

    it("una ruta con parámetro inexistente muestra el mensaje de repuesto no encontrado", async () => {
        renderApp("/repuesto/999");

        expect(await screen.findByText("Repuesto no encontrado")).toBeInTheDocument();
    });

    it("un parámetro que no es un número no consulta la API y muestra repuesto no encontrado", () => {
        renderApp("/repuesto/abc");

        expect(screen.getByText("Repuesto no encontrado")).toBeInTheDocument();
        expect(fetch).not.toHaveBeenCalled();
    });

    it("una ruta no reconocida muestra la página 404", () => {
        renderApp("/ruta-que-no-existe");

        expect(
            screen.getByRole("heading", { name: /404/ })
        ).toBeInTheDocument();
    });

    it('desde la página 404, "Volver al inicio" regresa a la página principal', async () => {
        const user = userEvent.setup();
        renderApp("/ruta-que-no-existe");

        await user.click(screen.getByRole("link", { name: "Volver al inicio" }));

        expect(window.location.pathname).toBe("/");
        expect(
            screen.getByRole("heading", { name: /Venta de repuestos y servicios/ })
        ).toBeInTheDocument();
    });
});
