import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// Load ENV
dotenv.config();

// Routers (we will create them next)
import enquiryRoutes from "./routes/enquiryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP
    message: "Too many requests from this IP, please try again later.",
  })
);

// CORS + JSON
app.use(cors());
app.use(bodyParser.json());

// Static folder (for uploaded images)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

// Root Test
app.get("/", (req, res) => res.json({ status: "OK", message: "MDKC API Running 🚀" }));

// Run Server
app.listen(PORT, () => console.log(`👉 Server running on port ${PORT}`));


app.use("/api/admin/dashboard", dashboardRoutes);
