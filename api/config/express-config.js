require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors(
  {
    origin: process.env.APP_URL,
    credentials: true,
  },
));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

const usersRouter = require('../src/domains/users/controllers/index.js');
app.use('/api/users', usersRouter);

const artistsRouter = require('../src/domains/artists/controllers/index.js');
app.use('/api/artists', artistsRouter);

const songsRouter = require('../src/domains/songs/controllers/index.js');
app.use('/api/songs', songsRouter);

const usersSongsRouter = require('../src/domains/userSongs/controllers/index.js');
app.use('/api/users-songs', usersSongsRouter);

const errorHandler = require('../src/middlewares/error-handler.js');
app.use(errorHandler);

module.exports = app;
