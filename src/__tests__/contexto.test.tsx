import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "../test/utils";

describe("Context API: carrito y favoritos", () => {
    it("agregar un repuesto actualiza el contador del carrito en el encabezado", async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        expect(screen.getByRole("link", { name: "Carrito" })).toBeInTheDocument();

        await user.click(screen.getAllByRole("button", { name: "Agregar al carrito" })[0]);

        expect(screen.getByRole("link", { name: "Carrito (1)" })).toBeInTheDocument();
    });

    it("el carrito se guarda en localStorage", async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        await user.click(screen.getAllByRole("button", { name: "Agregar al carrito" })[0]);

        expect(JSON.parse(localStorage.getItem("taller-jd-carrito")!)).toEqual([
            { id: 1, cantidad: 1 },
        ]);
    });

    it("un repuesto marcado como favorito aparece en la página de Favoritos", async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        await user.click(screen.getAllByRole("button", { name: "Agregar a favoritos" })[0]);
        expect(screen.getByRole("link", { name: "Favoritos (1)" })).toBeInTheDocument();

        await user.click(screen.getByRole("link", { name: "Favoritos (1)" }));

        expect(window.location.pathname).toBe("/favoritos");
        expect(
            screen.getByRole("heading", { name: "Pastillas de freno cerámicas" })
        ).toBeInTheDocument();
    });

    it("sin favoritos, la página de Favoritos muestra un mensaje vacío", () => {
        renderApp("/favoritos");

        expect(screen.getByText("Aún no tienes favoritos")).toBeInTheDocument();
    });
});