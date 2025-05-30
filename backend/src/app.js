const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");

const connectDB = require("./config/database");
const { PORT } = require("./config/constants");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authRoutes");
const mediaRouter = require("./routes/mediaRoutes");

app.use("/api/auth", authRouter);
app.use("/api/media", mediaRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => {
      console.log(`server successfully listen at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
