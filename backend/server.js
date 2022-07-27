const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 5000;

//enable cors
app.use(cors());

const routes = require("./routes");

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
