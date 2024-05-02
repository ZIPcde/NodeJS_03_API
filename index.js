const express = require('express');
const app = express();
const routes = require('./myModules/routes');

app.use(express.json());
app.use(routes);

app.listen(5000, () => console.log("Started on port 5000!"));