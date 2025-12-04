// Interfaz para la API de Geocodificación
export interface GeocodingResponse {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}