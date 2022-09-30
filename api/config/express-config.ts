import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: express.Express = express();

const options: cors.CorsOptions = {
  origin: process.env.APP_URL,
  credentials: true
}
app.use(cors(options));

app.use(cookieParser());

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

import usersRouter from '../src/domains/users/controllers/index';
app.use('/api/users', usersRouter);

import artistsRouter from '../src/domains/artists/controllers/index.js';
app.use('/api/artists', artistsRouter);

import songsRouter from '../src/domains/songs/controllers/index.js';
app.use('/api/songs', songsRouter);

import usersSongsRouter from '../src/domains/userSongs/controllers/index.js';
app.use('/api/users-songs', usersSongsRouter);

import errorHandler from '../src/middlewares/error-handler.js';
app.use(errorHandler);

export default app;