// Interfaz para los detalles del clima
export interface Weather {
  // ID del estado del clima. Ejemplo: 500
  id: number;
  // Grupo de parámetros climáticos (Rain, Snow, Clouds, etc.). Ejemplo: "Rain"
  main: string;
  // Descripción del clima dentro del grupo. Ejemplo: "lluvia ligera" 
  description: string;
  // ID del icono del clima. Ejemplo: "10d"
  icon: string;
}

// Interfaz para el objeto Rain (lluvia en la última hora)
// El campo es opcional ya que no está presente en todos los objetos.
export interface Rain {
  // Volumen de lluvia para la última hora, en mm. 
  '1h': number;
}

// Interfaz para las propiedades de un momento dado. Usado por Current y Hourly.
export interface BaseWeatherData {
  // Tiempo de datos, Unix, UTC. 
  dt: number;
  // Temperatura. 
  temp: number;
  // Sensación térmica. 
  feels_like: number;
  // Presión atmosférica, hPa. 
  pressure: number;
  // Humedad, %. 
  humidity: number;
  // Punto de rocío. 
  dew_point: number;
  // Índice UV. 
  uvi: number;
  // Cobertura de nubes, %. 
  clouds: number;
  // Visibilidad, metros. 
  visibility: number;
  // Velocidad del viento, metro/seg. 
  wind_speed: number;
  // Dirección del viento, grados (meteorológica). 
  wind_deg: number;
  // Descripción del clima. 
  weather: Weather[];
  // Volumen de lluvia. Es opcional. 
  rain?: Rain;
}

// Interfaz específica para el Clima Actual (Current)
export interface Current extends BaseWeatherData {
  // Hora de salida del sol, Unix, UTC. 
  sunrise: number;
  // Hora de puesta del sol, Unix, UTC. 
  sunset: number;
}

// Interfaz específica para la Previsión por Horas (Hourly)
export interface Hourly extends BaseWeatherData {
  // Probabilidad de precipitación (Pop). 
  pop: number;
  // Ráfaga de viento. 
  wind_gust?: number; // Es opcional
}

// Interfaz para las temperaturas en la Previsión Diaria
export interface DailyTemp {
  // Temperatura del día. 
  day: number;
  // Temperatura mínima para el día. 
  min: number;
  // Temperatura máxima para el día. 
  max: number;
  // Temperatura nocturna. 
  night: number;
  // Temperatura al anochecer. 
  eve: number;
  // Temperatura por la mañana. 
  morn: number;
}

// Interfaz para la sensación térmica en la Previsión Diaria
export interface DailyFeelsLike {
  // Sensación térmica del día. 
  day: number;
  // Sensación térmica nocturna. 
  night: number;
  // Sensación térmica al anochecer. 
  eve: number;
  // Sensación térmica por la mañana. 
  morn: number;
}

// Interfaz específica para la Previsión Diaria (Daily)
export interface Daily {
  // Tiempo de datos, Unix, UTC. 
  dt: number;
  // Hora de salida del sol, Unix, UTC. 
  sunrise: number;
  // Hora de puesta del sol, Unix, UTC. 
  sunset: number;
  // Hora de salida de la luna, Unix, UTC. 
  moonrise: number;
  // Hora de puesta de la luna, Unix, UTC. 
  moonset: number;
  // Fase lunar (0 a 1). 
  moon_phase: number;
  // Resumen textual del pronóstico. 
  summary: string;
  // Objeto de temperaturas. 
  temp: DailyTemp;
  // Objeto de sensación térmica. 
  feels_like: DailyFeelsLike;
  // Presión atmosférica, hPa. 
  pressure: number;
  // Humedad, %. 
  humidity: number;
  // Punto de rocío. 
  dew_point: number;
  // Velocidad del viento, metro/seg. 
  wind_speed: number;
  // Dirección del viento, grados. 
  wind_deg: number;
  // Ráfaga de viento. 
  wind_gust: number;
  // Descripción del clima. 
  weather: Weather[];
  // Cobertura de nubes, %. 
  clouds: number;
  // Probabilidad de precipitación. 
  pop: number;
  // Volumen de lluvia acumulado. Es opcional. 
  rain?: number;
  // Índice UV. 
  uvi: number;
}

// Interfaz Principal para la Respuesta Completa de la API
export interface OpenWeatherMapResponse {
  // Latitud de la ubicación. 
  lat: number;
  // Longitud de la ubicación. 
  lon: number;
  // Zona horaria para la ubicación. 
  timezone: string;
  // Desplazamiento de la zona horaria en segundos. 
  timezone_offset: number;
  // Datos meteorológicos actuales. 
  current: Current;
  // Previsión meteorológica por horas (hasta 48 horas). 
  hourly: Hourly[];
  // Previsión meteorológica diaria (hasta 8 días). 
  daily: Daily[];
}