require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/auth-routes');
// require('./db/mongoose')

const app = express();

// Middlewares
app.use(express.json())
app.use(authRouter)

module.exports = app