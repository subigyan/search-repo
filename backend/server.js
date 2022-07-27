const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 5000;

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 300, // limit each IP to 300 requests per 15 min
});

app.use(limiter);
app.set("trust proxy", 1);

//enable cors
app.use(cors());

const routes = require("./routes");

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
