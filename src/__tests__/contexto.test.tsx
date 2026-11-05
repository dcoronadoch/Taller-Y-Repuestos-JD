import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "../test/utils";

describe("Context API: carrito y favoritos", () => {
    it("agregar un repuesto actualiza el contador del carrito en el encabezado", async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        expect(screen.getByRole("link", { name: "Carrito" })).toBeInTheDocument();

        await user.click((await screen.findAllByRole("button", { name: "Agregar al carrito" }))[0]);

        expect(screen.getByRole("link", { name: "Carrito (1)" })).toBeInTheDocument();
    });

    it("el carrito se guarda en localStorage con los datos del repuesto", async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        await user.click((await screen.findAllByRole("button", { name: "Agregar al carrito" }))[0]);

        const guardado = JSON.parse(localStorage.getItem("taller-jd-carrito")!);

        expect(guardado).toHaveLength(1);
        expect(guardado[0]).toMatchObject({
            cantidad: 1,
            repuesto: { id: 1, nombre: "Pastillas de freno cerámicas", precio: 18500 },
        });
    });

    it("un carrito guardado con el formato anterior (solo id y cantidad) se descarta", () => {
        localStorage.setItem("taller-jd-carrito", JSON.stringify([{ id: 1, cantidad: 2 }]));
        renderApp("/");

        expect(screen.getByRole("link", { name: "Carrito" })).toBeInTheDocument();
    });

    it("un repuesto marcado como favorito aparece en la página de Favoritos", async () => {
        const user = userEvent.setup();
        renderApp("/catalogo");

        await user.click((await screen.findAllByRole("button", { name: "Agregar a favoritos" }))[0]);
        expect(screen.getByRole("link", { name: "Favoritos (1)" })).toBeInTheDocument();

        await user.click(screen.getByRole("link", { name: "Favoritos (1)" }));

        expect(window.location.pathname).toBe("/favoritos");
        expect(
            await screen.findByRole("heading", { name: "Pastillas de freno cerámicas" })
        ).toBeInTheDocument();
    });

    it("sin favoritos, la página de Favoritos muestra un mensaje vacío", () => {
        renderApp("/favoritos");

        expect(screen.getByText("Aún no tienes favoritos")).toBeInTheDocument();
    });
});
