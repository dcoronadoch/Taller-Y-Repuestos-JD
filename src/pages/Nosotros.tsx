import { Link } from "react-router-dom";

function Nosotros() {
    return (
        <>
            <section className="hero">
                <div className="contenedor hero-contenido">

                    <div className="hero-texto">
                        <h1>Sobre Nosotros</h1>

                        <p>
                            Somos un taller costarricense apasionado por los motores,
                            dedicado a ofrecer repuestos de calidad y un servicio
                            técnico honesto para que tu vehículo siga rodando sin
                            preocupaciones.
                        </p>
                    </div>

                </div>
            </section>

            <section>
                <div className="contenedor">
                    <h2>Nuestra Historia</h2>

                    <p>
                        Este proyecto nació en una casa de habitación, importando
                        repuestos para los proyectos de nuestro grupo de amigos y
                        realizando los servicios mecánicos a nuestros vecinos y
                        amigos. Con el paso de los años nos dimos a conocer, y a
                        inicios del 2026 fundamos lo que hoy es Taller y Repuestos
                        JD. Actualmente contamos con un equipo especializado en
                        diagnóstico, reparación y venta de repuestos para todo tipo
                        de vehículos.
                    </p>
                </div>
            </section>

            <section>
                <div className="contenedor">
                    <div className="grid-servicios">

                        <article className="tarjeta">
                            <h3>Misión</h3>
                            <p>
                                Brindar repuestos de calidad y un servicio mecánico
                                confiable, cuidando cada vehículo como si fuera
                                propio.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>Visión</h3>
                            <p>
                                Ser el taller de referencia en la zona, reconocido
                                por la honestidad y calidad de nuestro trabajo.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>Compromiso</h3>
                            <p>
                                Trabajar siempre con transparencia, puntualidad y
                                respeto hacia nuestros clientes.
                            </p>
                        </article>

                    </div>
                </div>
            </section>

            <section>
                <div className="contenedor">
                    <h2>Nuestros Valores</h2>

                    <div className="grid-servicios">

                        <article className="tarjeta">
                            <h3>Calidad</h3>
                            <p>
                                Usamos repuestos confiables y trabajamos con
                                herramientas y técnicas actualizadas.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>Trabajo en Equipo</h3>
                            <p>
                                Cada mecánico y asesor trabaja en conjunto para
                                darte la mejor solución.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>Honestidad</h3>
                            <p>
                                Te decimos exactamente lo que tu vehículo necesita,
                                sin cobros ni reparaciones innecesarias.
                            </p>
                        </article>

                    </div>
                </div>
            </section>

            <section className="cta">
                <div className="contenedor">
                    <h2>Nuestra experiencia</h2>

                    <div className="grid-servicios">
                        <article>
                            <h2>500+</h2>
                            <p>Vehículos atendidos</p>
                        </article>

                        <article>
                            <h2>400+</h2>
                            <p>Clientes satisfechos</p>
                        </article>

                        <article>
                            <h2>5+</h2>
                            <p>Años de experiencia</p>
                        </article>
                    </div>
                </div>
            </section>

            <section>
                <div className="contenedor centrar">
                    <h2>¿Desea trabajar con nosotros?</h2>

                    <br />

                    <Link to="/contacto" className="boton">
                        Solicitar información
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Nosotros;