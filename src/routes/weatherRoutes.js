const express = require("express");
const { getNormalizedWeather } = require("../services/weatherService");

const router = express.Router();

// Endpoint: GET /api/weather?city=Caracas&country=VE
// O:         GET /api/weather?city=Miami&country=US&state=FL
router.get("/weather", async (req, res) => {
    // Extraer y validar los parametros de la query
    const { city, country, state } = req.query;

    if (typeof city !== "string" || typeof country !== "string") {
        return res.status(400).json({
            error: 'Los parámetros "city" y "country" son obligatorios.'
        });
    }

    const stateCode = typeof state === "string" ? state : undefined;

    // Llamada al servicio
    try {
        const cleanData = await getNormalizedWeather(city, country, stateCode);

        return res.status(200).json(cleanData);
    } catch (error) {
        console.error("Error en el endpoint /weather:", error);
        // Manejo de errores del servidor (ej: ubicación no encontrada)
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
