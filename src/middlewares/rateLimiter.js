const { rateLimit } = require("express-rate-limit");

const weatherRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // 100 peticiones por IP cada 15 minutos
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Demasiadas solicitudes, por favor intenta de nuevo más tarde."
    }
});

module.exports = { weatherRateLimiter };
