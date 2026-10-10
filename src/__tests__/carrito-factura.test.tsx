import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderApp } from "../test/utils";

// Agrega la primera pieza del catálogo (Pastillas de freno, ₡18 500) y abre el carrito
async function agregarPrimerRepuestoYAbrirCarrito() {
    const user = userEvent.setup();
    renderApp("/catalogo");

    await user.click(screen.getAllByRole("button", { name: "Agregar al carrito" })[0]);
    await user.click(screen.getByRole("link", { name: "Carrito (1)" }));

    return user;
}

describe("Carrito y consumo de la API de tipo de cambio", () => {
    it("con el carrito vacío muestra un mensaje", async () => {
        renderApp("/carrito");

        expect(await screen.findByText("Tu carrito está vacío")).toBeInTheDocument();
    });

    it("muestra el subtotal en dólares calculado con el tipo de cambio de la API", async () => {
        await agregarPrimerRepuestoYAbrirCarrito();

        // ₡18 500 / 500 (tipo de cambio simulado) = US$ 37
        expect(await screen.findByText("US$ 37")).toBeInTheDocument();
        expect(screen.getByText("Subtotal($)")).toBeInTheDocument();
    });

    it("mientras la API responde muestra el estado de carga", async () => {
        vi.stubGlobal("fetch", vi.fn(() => new Promise(() => {}))); // nunca responde
        await agregarPrimerRepuestoYAbrirCarrito();

        expect(screen.getByText("Calculando...")).toBeInTheDocument();
    });

    it("si la API falla, el carrito sigue funcionando y avisa que el valor no está disponible", async () => {
        vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("sin red"))));
        await agregarPrimerRepuestoYAbrirCarrito();

        expect(await screen.findByText("No disponible")).toBeInTheDocument();
        expect(screen.getByText("Pastillas de freno cerámicas")).toBeInTheDocument();
    });

    it("aumentar la cantidad recalcula el total en dólares", async () => {
        const user = await agregarPrimerRepuestoYAbrirCarrito();

        await user.click(screen.getByRole("button", { name: "+" }));

        // 2 × ₡18 500 = ₡37 000 → US$ 74
        expect(await screen.findByText("US$ 74")).toBeInTheDocument();
    });
});

describe("Factura", () => {
    it('marcar "retiro en tienda" deshabilita y limpia la dirección de envío', async () => {
        const user = await agregarPrimerRepuestoYAbrirCarrito();
        await user.click(screen.getByRole("link", { name: "Finalizar compra" }));

        const direccion = screen.getByLabelText("Dirección de envío");
        await user.type(direccion, "San José, Escazú");
        expect(direccion).toHaveValue("San José, Escazú");

        await user.click(
            screen.getByLabelText("Deseo pasar a recoger el producto en tienda")
        );

        expect(direccion).toBeDisabled();
        expect(direccion).toHaveValue("");
    });

    it("sin productos en el carrito no permite facturar", async () => {
        renderApp("/factura");

        expect(
            await screen.findByText("No tienes productos para facturar")
        ).toBeInTheDocument();
    });
});