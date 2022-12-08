import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { logger } from "./src/utils/logger";
import { UserRoutes, BookRoutes } from "./src/routes/";
import mongoose from "mongoose";
import { errorHandler } from "./src/middleware/error.middleware";
import cors from "cors";

// load config files
dotenv.config();

const app = express();
const PORT = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_PORT : process.env.DEVELOPMENT_PORT;

mongoose.connect(process.env.DB_URL as string);

/* Middlerwares */
app.use(
    cors({
        credentials: true,
        origin: [
            'http://localhost:3000',
        ],
        optionsSuccessStatus: 200,
    })
);
app.use(express.json());
app.use("/user", UserRoutes);
app.use("/book", BookRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
})