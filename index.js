const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./Routes/routes.js');
const cors = require("cors");
const { connectToDatabase, pool } = require('./sql/connectToDatabase.js');
const { PORT } = require('./common/variable.js');
const { createAllTableInDB } = require('./common/version.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());

// Connect to the database
connectToDatabase()
  .then(() => {

    console.log('Connected to the database successfully');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
