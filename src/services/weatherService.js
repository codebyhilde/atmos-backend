const { normalizeWeatherData } = require("../utils/dataNormalization");

const API_KEY = process.env.OPENWEATHER_API_KEY;

// Obtener Latitud y Longitud
async function getCoordinates(city, countryCode, stateCode) {
    if (!API_KEY) throw new Error("API Key no configurada.");

    const q = [city, stateCode, countryCode].filter(Boolean).join(",");
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct`;

    const params = new URLSearchParams({
        q: q,
        limit: "1",
        appid: API_KEY
    });

    const fullUrl = `${geoUrl}?${params.toString()}`;

    try {
        const response = await fetch(fullUrl);

        if (!response.ok) {
            throw new Error(
                `Error HTTP: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error(`Ubicación no encontrada: ${q}`);
        }

        const { lat, lon } = data[0];
        return { lat, lon };
    } catch (error) {
        console.error("Error en Geocoding API:", error);
        // Re-lanza el error y sirve como Type Guard
        if (
            error instanceof Error &&
            error.message.includes("Ubicación no encontrada")
        ) {
            throw error;
        }

        throw new Error("No se pudo encontrar la ubicación.");
    }
}

// Obtener datos del clima
async function getRawWeatherData(lat, lon) {
    if (!API_KEY) throw new Error("API Key no configurada.");

    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall`;

    const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        appid: API_KEY,
        units: "metric",
        exclude: "minutely,alerts",
        lang: "es"
    });

    const fullUrl = `${weatherUrl}?${params.toString()}`;

    try {
        const response = await fetch(fullUrl);

        if (!response.ok) {
            throw new Error(
                `Error HTTP: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en One Call API:", error);
        throw new Error("No se pudo obtener el clima.");
    }
}

async function getNormalizedWeather(city, countryCode, stateCode) {
    const { lat, lon } = await getCoordinates(city, countryCode, stateCode);

    const rawData = await getRawWeatherData(lat, lon);

    const normalizedData = normalizeWeatherData(rawData);

    return normalizedData;
}

module.exports = { getNormalizedWeather };
