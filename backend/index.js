const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bankModal = require("./modals/bank");
const accountRoutes = require("./routes/account");
const bankRoutes = require("./routes/bank");
const userRoutes = require("./routes/user");
const cors = require("cors");

const server = express();
const handleError = (req, res, next) => {
  console.log("Error page executed");
  next();
};

server.use(bodyParser.json());
server.use(cors());

//routes
server.use(accountRoutes);
server.use(bankRoutes);
server.use(userRoutes);
server.get("*", handleError, (req, res) => {
  res.send("404 page not found");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://Coker:Coker1985@cluster0.nm4ae6y.mongodb.net/BankService?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    server.listen(4000, "localhost", () => {
      console.log("Connected to the DB!");
    });
  })
  .catch((err) => console.log(err));
