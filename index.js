require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weatherRouter = require("./src/routes/weatherRoutes");
const { weatherRateLimiter } = require("./src/middlewares/rateLimiter");
const serverless = require("serverless-http");

const NODE_ENVIRONMENT = process.env.NODE_ENV || "production";

// Inicialización de Express
const app = express();

// CORS simplificado - prueba sin restricciones primero
app.use(cors({
    origin: true,  // Permite todos los orígenes temporalmente
    credentials: true
}));

// Manejo de JSON
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Ruta de Bienvenida (Health Check)
app.get("/", (_req, res) => {
    res.status(200).json({ 
        message: "Servidor del Clima operativo.",
        status: "ok",
        timestamp: new Date().toISOString()
    });
});

// Endpoint de prueba simple (sin dependencias externas)
app.get("/api/test", (req, res) => {
    console.log("Test endpoint llamado");
    res.json({ 
        success: true, 
        message: "API funcionando",
        timestamp: new Date().toISOString(),
        query: req.query
    });
});

// Health endpoint para Vercel
app.get("/health", (_req, res) => {
    res.status(200).json({ 
        status: "healthy",
        environment: NODE_ENVIRONMENT,
        timestamp: new Date().toISOString()
    });
});

// Uso del rate limiter (comenta temporalmente si causa problemas)
app.use("/api", weatherRateLimiter);

// Enrutamiento de la API
app.use("/api", weatherRouter);

// 404 handler
app.use("*", (_req, res) => {
    res.status(404).json({ 
        error: "Ruta no encontrada",
        timestamp: new Date().toISOString()
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error("Error global:", err);
    res.status(500).json({ 
        error: "Error interno del servidor",
        message: NODE_ENVIRONMENT === "development" ? err.message : undefined
    });
});

// Solo arrancar el servidor en desarrollo
if (NODE_ENVIRONMENT === "development") {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`⚡️ Backend Server running at http://localhost:${PORT}`);
    });
}

module.exports.handler = serverless(app);