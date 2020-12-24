const express = require('express');
require('dotenv').config();
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const AuthRoute = require('./Routers/AuthRouter')
app.use('/auth', AuthRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})