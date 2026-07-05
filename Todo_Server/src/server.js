import app from "./app.js";
import connectDB from "./config/db.js";
import { PORT } from "./config/constants.js";

async function startServer() {
  try {
    await connectDB();
    console.log(" Database connected");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
  }
}

startServer();
