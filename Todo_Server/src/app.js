import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import notFound from "./middlewares/notFound.js";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js"
import cors from "cors";
import { ALLOWED_ORIGINS } from "./config/constants.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  cors({
    origin: ALLOWED_ORIGINS?.split(","),
    credentials: true,
  }),
);

// root test
app.get("/", (req, res) => {
  res.json({ service: "to to list server", status: "ok" });
});

//router
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use(notFound);

// global error handler
app.use(errorHandler);


export default app;
