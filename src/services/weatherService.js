const { normalizeWeatherData } = require("../utils/dataNormalization");

const API_KEY = process.env.OPENWEATHER_API_KEY;

async function fetchWithTimeout(url, options = {}) {
    const timeout = 10000; // 10 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === "AbortError") {
            throw new Error("La solicitud tardó demasiado tiempo");
        }
        throw error;
    }
}

// Obtener Latitud y Longitud
async function getCoordinates(city, countryCode, stateCode) {
    if (!API_KEY) {
        console.error("API Key no configurada");
        throw new Error("API Key no configurada.");
    }

    const q = [city, stateCode, countryCode].filter(Boolean).join(",");
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct`;

    const params = new URLSearchParams({
        q: q,
        limit: "1",
        appid: API_KEY
    });

    const fullUrl = `${geoUrl}?${params.toString()}`;
    console.log("Geocoding URL:", fullUrl.replace(API_KEY, "API_KEY_HIDDEN"));

    try {
        const response = await fetchWithTimeout(fullUrl);

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
        console.error("Error en Geocoding API:", error.message);
        if (error.message.includes("Ubicación no encontrada")) {
            throw error;
        }
        throw new Error("No se pudo encontrar la ubicación.");
    }
}

// Obtener datos del clima
async function getRawWeatherData(lat, lon) {
    if (!API_KEY) {
        console.error("API Key no configurada");
        throw new Error("API Key no configurada.");
    }

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
    console.log("Weather URL:", fullUrl.replace(API_KEY, "API_KEY_HIDDEN"));

    try {
        const response = await fetchWithTimeout(fullUrl);

        if (!response.ok) {
            throw new Error(
                `Error HTTP: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en One Call API:", error.message);
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
