const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const auth = require('./routes/user');

const db = require('./utils/db');

app.use('/api', auth);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/api`);
});