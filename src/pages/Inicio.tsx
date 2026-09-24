import { Link } from "react-router-dom";
import logoClaro from "../assets/logo-jd.png";

function Inicio() {
    return (
        <>
            <section className="hero">
                <div className="contenedor hero-contenido">

                    <div className="hero-texto">
                        <h1>
                            Venta de repuestos y servicios de mantenimiento automotriz
                        </h1>

                        <p>
                           Ofrecemos una amplia gama de repuestos de calidad y servicios
                            de mantenimiento profesional para todo tipo de vehículos,
                            garantizando un servicio de calidad, confianza y atención
                            personalizada.
                        </p>

                        <Link to="/catalogo" className="boton">
                            Ver catálogo de repuestos
                        </Link>
                    </div>

                    <div className="hero-imagen">
                        <img src={logoClaro} alt="Logo Taller y Repuestos JD" />
                    </div>

                </div>
            </section>

            <section className="nosotros">
                <div className="contenedor">
                    <h2>¿Quiénes somos?</h2>

                    <p>
                        Somos una empresa costarricense especializada en venta de
                        repuestos automotrices, servicios de mecánica general,
                        mantenimiento preventivo y correctivo, así como diagnóstico
                        y reparación de todo tipo de vehículos.
                    </p>
                </div>
            </section>

            <section className="servicios">
                <div className="contenedor">
                    <h2>Nuestros Servicios</h2>

                    <div className="grid-servicios">
                        <article className="tarjeta">
                            <h3>Reparaciones y mantenimiento</h3>
                            <p>
                                Reparación y mantenimiento de vehículos de todos los
                                modelos.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>Venta de repuestos</h3>
                            <p>
                                Amplia variedad de repuestos de calidad para todo tipo
                                de vehículos.
                            </p>
                        </article>

                        <article className="tarjeta">
                            <h3>Consultoría</h3>
                            <p>
                                Asesoramiento experto para optimizar el rendimiento y
                                la durabilidad de tu vehículo.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="cta">
                <div className="contenedor">
                    <h2>¿Necesitas un repuesto específico?</h2>

                    <Link to="/catalogo" className="boton">
                        Ver catálogo completo
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Inicio;