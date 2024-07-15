const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/dbConfig");
app.use(express.json());
const usersRoute = require("./routes/usersRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const dashboardRoute = require("./routes/dashboardRoute");

app.use("/api/users", usersRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/dashboard", dashboardRoute);

// Connect to MongoDB
connectDB();

// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}


app.listen(port, () => {
  console.log(`Node JS Server started at port ${port}`);
});
