import "dotenv/config.js";
import "express-async-errors";
import express from "express";
import notFound from "./middlewares/not-foundmiddlewares.js";
import errorHandler from "./middlewares/error-handlemiddle.js";
import connectDB from "./config/db.config.js";
import { auth } from "./features/auth/index.js";
import profileRoutes from "./features/profile/profile.route.js";
import youtubeRoutes from "./features/youtube/youtube.route.js"; // Import de la nouvelle route
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";
import path from "path";

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

connectDB();
app.set("trust proxy", 1);
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limiter chaque IP à 100 requêtes par 15 minutes
    standardHeaders: "draft-7", // headers `RateLimit-*`.
    legacyHeaders: false, // Désactiver les headers `X-RateLimit-*`.
  })
);
app.use(mongoSanitize());
app.use(
  cors({
    origin: "*", // Ou spécifiez l'origine de votre frontend si nécessaire
    methods: ["GET", "POST", "PUT", "DELETE"], // Autorisez toutes les méthodes nécessaires
    allowedHeaders: ["Authorization", "Content-Type"], // Autorisez les en-têtes nécessaires
  })
);
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/", (_req, res) => {
  res.status(200).send("<h1>API</h1><a href='/api-docs'>Documentation</a>");
});

// Routes d'authentification
app.use("/api/v1/auth", auth);

// Routes de gestion du profil
app.use("/api/v1/profile", profileRoutes);

// Route pour récupérer les vidéos YouTube
app.use("/api/v1/youtube", youtubeRoutes); // Nouvelle route pour YouTube

// Middleware pour les routes non trouvées
app.use(notFound);
app.use(errorHandler);

export default app;
