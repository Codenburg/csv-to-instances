export const API_BASE_URL = process.env.NODE_ENV === "production"
? import.meta.env.VITE_BACKEND_URL
: "http://localhost:8000";