// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config.js";
import "express-async-errors";
import notFound from "./middlewares/not-foundmiddlewares.js";
import errorHandler from "./middlewares/error-handlemiddle.js";
import connectDB from "./config/db.config.js";
import { auth } from "./features/auth/index.js";
import profileRoutes from "./features/profile/profile.route.js";
import youtubeRoutes from "./features/youtube/youtube.route.js";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";

// Récupération des chemins corrects dans ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

// Connexion à la base de données
connectDB();

// Configuration des middlewares
app.set("trust proxy", 1);
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);
app.use(mongoSanitize());
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Route pour servir les avatars stockés dans le répertoire client/public/avatars
app.use(
  "/avatars",
  express.static(path.join(__dirname, "..", "client", "public", "avatars"))
);

// Routes
app.get("/", (_req, res) => {
  res.status(200).send("<h1>API</h1><a href='/api-docs'>Documentation</a>");
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/youtube", youtubeRoutes);

// Middleware pour gérer les routes non trouvées et les erreurs
app.use(notFound);
app.use(errorHandler);

export default app;
