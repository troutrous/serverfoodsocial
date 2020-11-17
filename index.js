const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const AuthRoute = require('./Routers/AuthRouter')
app.use('/auth', AuthRoute);

app.listen({port}, () => {
    console.log('Server listening on port ' + port);
})