const cors = require("cors");
const users = require("./routes/users");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", users);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
