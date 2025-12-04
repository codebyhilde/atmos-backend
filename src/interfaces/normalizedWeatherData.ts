// Datos del pronóstico por hora
export interface NormalizedHourlyForecast {
    // Hora formateada para ser legible
    time: string;
    // Temperatura redondeada
    temp: number;
    // Icono (un emoji) asignado por el backend
    icon: string;
}

// Datos del pronóstico semanal
export interface NormalizedDailyForecast {
    // Etiquetas de los días (ej. "Hoy", "Lun", "Mar")
    labels: string[];
    maxTemps: number[];
    minTemps: number[];
}

// Datos actuales, simplificados y listos para el frontend
export interface NormalizedCurrentData {
    // La hora actual formateada (ej. "03:44 PM")
    hour: string;
    temp: number;
    // Descripción del clima (ej. "lluvia ligera")
    description: string;
    // Código del icono del clima (ej. "10d")
    icon: string;
    humidity: number;
    // Velocidad del viento (kph)
    wind_speed: number;
    // Presión atmosférica (hPa)
    pressure: number;
}

// Interfaz principal: Datos completamente normalizados por el backend
export interface NormalizedWeatherData {
    // Zona horaria (ej. "America/Caracas")
    timezone: string;
    // Objeto con todos los datos actuales necesarios
    current: NormalizedCurrentData;
    // Array del pronóstico por hora
    hourly: NormalizedHourlyForecast[];
    // Objeto con los datos listos para el gráfico semanal
    daily: NormalizedDailyForecast;
}
