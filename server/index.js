import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// ✅ FIXED CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ✅ ROOT ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);


// ✅ SAFE SERVER START
const startServer = async () => {
  try {
    await dbConnection();
    app.listen(port, () =>
      console.log(`Server listening on ${port}`)
    );
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};

startServer();