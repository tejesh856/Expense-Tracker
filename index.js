const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db');
const app = express();
const PORT = 3000;

mongodb().then(async () => {
    await app.use(bodyParser.urlencoded({ extended: true }));
    await app.use(bodyParser.json());
    await app.use('/',express.static('public'));
    await app.use('/',require('./routes/routes'));
    await app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => { console.log(err) });
