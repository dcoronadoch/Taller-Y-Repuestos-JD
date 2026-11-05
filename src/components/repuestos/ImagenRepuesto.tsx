import { useState } from "react";
import sinImagen from "../../assets/repuestos/sin-imagen.svg";

interface ImagenRepuestoProps {
    src: string;
    alt: string;
    className?: string;
}

// Muestra la imagen del repuesto; si la URL no carga, usa una imagen de respaldo.
function ImagenRepuesto({ src, alt, className }: ImagenRepuestoProps) {
    const [srcFallida, setSrcFallida] = useState<string | null>(null);

    return (
        <img
            src={srcFallida === src ? sinImagen : src}
            alt={alt}
            className={className}
            referrerPolicy="no-referrer"
            onError={() => setSrcFallida(src)}
        />
    );
}

export default ImagenRepuesto;
