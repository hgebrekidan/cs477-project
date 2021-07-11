const express = require('express');
const cors = require('cors');
const mongoConnect = require('./utils/database').mongoConnect;
const bookRouter = require('./routes/book');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());















mongoConnect(() => {
    app.listen(3222, () => console.log('listening to 3222...'));
});