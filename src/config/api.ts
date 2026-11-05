// URL base del backend. Se configura con VITE_API_URL (archivo .env).
// Sin esa variable se usa el backend local.
const API_BASE_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const API_URL = `${API_BASE_URL}/api`;
