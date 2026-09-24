import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface FormularioContacto {
    nombre: string;
    correo: string;
    telefono: string;
    empresa: string;
    mensaje: string;
}

function Contacto() {
    const [formulario, setFormulario] = useState<FormularioContacto>({
        nombre: "",
        correo: "",
        telefono: "",
        empresa: "",
        mensaje: ""
    });

    const [enviado, setEnviado] = useState(false);

    function manejarCambio(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { id, value } = e.target;
        setFormulario((anterior) => ({
            ...anterior,
            [id]: value
        }));
    }

    function manejarEnvio(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setEnviado(true);

        setFormulario({
            nombre: "",
            correo: "",
            telefono: "",
            empresa: "",
            mensaje: ""
        });

        setTimeout(() => setEnviado(false), 4000);
    }

    return (
        <>
            <section className="hero">
                <div className="contenedor hero-contenido">

                    <div className="hero-texto">
                        <h1>Hablemos de su próximo proyecto</h1>

                        <p>
                            Estamos listos para ayudarle a encontrar la solución
                            que necesita. Contáctenos hoy mismo y uno de nuestros
                            expertos se pondrá en contacto con usted.
                        </p>

                        <a href="#formulario" className="boton">
                            Enviar mensaje
                        </a>
                    </div>

                </div>
            </section>

            <section>
                <div className="contenedor">
                    <h2>Información de contacto</h2>

                    <div className="grid-servicios">

                        <article className="tarjeta">
                            <h3>📍 Dirección</h3>
                            <p>Liberia, Guanacaste, Costa Rica</p>
                        </article>

                        <article className="tarjeta">
                            <h3>📞 Teléfono</h3>
                            <p>(+506) 2222-2222</p>
                        </article>

                        <article className="tarjeta">
                            <h3>📧 Correo</h3>
                            <p>tallerjd@email.com</p>
                        </article>

                    </div>
                </div>
            </section>

            <section id="formulario">
                <div className="contenedor">
                    <h2>Envíenos un mensaje</h2>

                    <form className="formulario" onSubmit={manejarEnvio}>

                        <div className="grupo">
                            <label htmlFor="nombre">Nombre completo</label>
                            <input
                                type="text"
                                id="nombre"
                                placeholder="Ingrese su nombre"
                                value={formulario.nombre}
                                onChange={manejarCambio}
                                required
                            />
                        </div>

                        <div className="grupo">
                            <label htmlFor="correo">Correo electrónico</label>
                            <input
                                type="email"
                                id="correo"
                                placeholder="correo@ejemplo.com"
                                value={formulario.correo}
                                onChange={manejarCambio}
                                required
                            />
                        </div>

                        <div className="grupo">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="tel"
                                id="telefono"
                                placeholder="+506 8888-8888"
                                value={formulario.telefono}
                                onChange={manejarCambio}
                            />
                        </div>

                        <div className="grupo">
                            <label htmlFor="empresa">Empresa</label>
                            <input
                                type="text"
                                id="empresa"
                                placeholder="Nombre de la empresa"
                                value={formulario.empresa}
                                onChange={manejarCambio}
                            />
                        </div>

                        <div className="grupo">
                            <label htmlFor="mensaje">Mensaje</label>
                            <textarea
                                id="mensaje"
                                placeholder="Escriba aquí su consulta..."
                                value={formulario.mensaje}
                                onChange={manejarCambio}
                                required
                            />
                        </div>

                        <button type="submit" className="boton">
                            Enviar mensaje
                        </button>

                        {enviado && (
                            <p className="mensaje-confirmacion">
                                ¡Gracias! Su mensaje fue enviado correctamente.
                            </p>
                        )}

                    </form>
                </div>
            </section>

            <section className="cta">
                <div className="contenedor">
                    <h2>Nuestra ubicación</h2>

                    <br />

                    <iframe
                        id="mapa"
                        title="Ubicación del taller"
                        src="https://www.google.com/maps?q=10.6346,-85.4372&output=embed"
                        width="100%"
                        height="350"
                        style={{ border: 0, borderRadius: "12px" }}
                        loading="lazy"
                    />
                </div>
            </section>
        </>
    );
}

export default Contacto;