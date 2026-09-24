import { Link } from "react-router-dom";

function Servicios() {
    return (
        <>
            <section className="hero">
                <div className="contenedor hero-contenido">

                    <div className="hero-texto">
                        <h1>Nuestros Servicios</h1>

                        <p>
                            Aquí encontrará una descripción detallada de los
                            servicios que ofrecemos, diseñados para brindar
                            soluciones confiables y eficientes que respondan a sus
                            necesidades automotrices.
                        </p>
                    </div>

                </div>
            </section>

            <section>
                <div className="contenedor">
                    <h2>Soluciones que ofrecemos</h2>

                    <div className="grid-servicios">

                        <article className="tarjeta">
                            <h3>🛠️ Reparaciones</h3>
                            <p>
                                Reparación y mantenimiento de vehículos de todos
                                los modelos.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>🔩 Venta de repuestos</h3>
                            <p>
                                Venta de repuestos y accesorios automotrices de
                                alta calidad.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>📕 Consultoría</h3>
                            <p>
                                Asesoramiento experto para optimizar el rendimiento
                                y la durabilidad de tu vehículo.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>🕒 Mantenimiento Preventivo</h3>
                            <p>
                                Servicios de mantenimiento preventivo para
                                garantizar el buen funcionamiento de tu vehículo.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>🔧 Diagnóstico Avanzado</h3>
                            <p>
                                Diagnóstico avanzado de problemas mecánicos y
                                electrónicos.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>⚙️ Modificaciones</h3>
                            <p>
                                Realizamos la instalación de todo tipo de
                                accesorios y modificaciones para tu vehículo.
                            </p>
                        </article>

                    </div>
                </div>
            </section>

            <section>
                <div className="contenedor">
                    <h2>Nuestro proceso de trabajo</h2>

                    <div className="grid-servicios">

                        <article className="tarjeta">
                            <h3>1. Diagnóstico</h3>
                            <p>
                                Revisamos el vehículo y escuchamos al cliente para
                                identificar la causa real del problema.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>2. Cotización</h3>
                            <p>
                                Le explicamos al cliente qué necesita el vehículo
                                y le damos un precio claro antes de trabajar.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>3. Búsqueda de repuestos</h3>
                            <p>
                                Conseguimos el repuesto adecuado, ya sea original
                                o alternativo de calidad.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>4. Reparación</h3>
                            <p>
                                Realizamos el trabajo mecánico con herramientas
                                adecuadas y personal capacitado.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>5. Pruebas</h3>
                            <p>
                                Probamos el vehículo para confirmar que el
                                problema quedó resuelto.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>6. Entrega y garantía</h3>
                            <p>
                                Entregamos el vehículo listo, con garantía sobre
                                el trabajo realizado.
                            </p>
                        </article>

                    </div>
                </div>
            </section>

            <section className="cta">
                <div className="contenedor">
                    <h2>Equipo y herramientas que utilizamos</h2>

                    <br />

                    <p>
                        Trabajamos con equipo de diagnóstico computarizado y
                        herramientas actualizadas, para garantizar reparaciones
                        precisas y de calidad en cada vehículo.
                    </p>
                </div>
            </section>

            <section>
                <div className="contenedor centrar">
                    <h2>¿Necesitas repuestos o servicio mecánico de confianza?</h2>

                    <br />

                    <Link to="/contacto" className="boton">
                        Solicitar información
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Servicios;