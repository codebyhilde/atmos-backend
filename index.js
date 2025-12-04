require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weatherRouter = require("./src/routes/weatherRoutes");
const { weatherRateLimiter } = require("./src/middlewares/rateLimiter");
const serverless = require("serverless-http");

const NODE_ENVIRONMENT = process.env.NODE_ENV;

// Inicialización de Express
const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
    "http://localhost:5173",
    "https://atmos-weather-one.vercel.app",
    "https://atmos-weather-backend.vercel.app"
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permite solicitudes sin origen (como Postman o peticiones del mismo servidor)
        if (!origin) return callback(null, true);

        // Verificamos si el origen está en nuestra lista
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg =
                "La política CORS para este sitio no permite el acceso desde el origen especificado.";
            return callback(new Error(msg), false);
        }

        // Si pasa la validación, se permite la solicitud
        return callback(null, true);
    }
};

app.use(cors(corsOptions));

// Manejo de JSON
app.use(express.json());

// Ruta de Bienvenida (Health Check)
app.get("/", (_req, res) => {
    res.status(200).send("Servidor del Clima operativo.");
});

// Uso del rate limiter
app.use("/api", weatherRateLimiter);

// Enrutamiento de la API
app.use("/api", weatherRouter);

// Arrancar el Servidor
if (NODE_ENVIRONMENT === "development") {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`⚡️ Backend Server running at http://localhost:${PORT}`);
    });
}

module.exports.handler = serverless(app);