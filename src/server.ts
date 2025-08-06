import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import notificationRoutes from "./routes/NotificationRoutes";
import database from "./config/database";

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/notifications", notificationRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Notification Service is running",
    timestamp: new Date().toISOString(),
    service: "notification-service",
  });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("❌ [NOTIFICATION SERVICE] Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
async function startServer() {
  try {
    // Connect to database
    await database.connect();
    console.log("🔗 [NOTIFICATION SERVICE] Connected to database");

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 [NOTIFICATION SERVICE] Server running on port ${PORT}`);
      console.log(
        `📡 [NOTIFICATION SERVICE] Health check: http://localhost:${PORT}/health`
      );
      console.log(
        `🔔 [NOTIFICATION SERVICE] API: http://localhost:${PORT}/api/notifications`
      );
    });
  } catch (error) {
    console.error("❌ [NOTIFICATION SERVICE] Failed to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log(
    "🛑 [NOTIFICATION SERVICE] SIGTERM received, shutting down gracefully"
  );
  await database.disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log(
    "🛑 [NOTIFICATION SERVICE] SIGINT received, shutting down gracefully"
  );
  await database.disconnect();
  process.exit(0);
});

startServer();
