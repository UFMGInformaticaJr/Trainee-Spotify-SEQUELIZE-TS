import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import { getEnv } from '../utils/functions/get-env';

dotenv.config();
export const app: Express = express();

const options: CorsOptions = {
  origin: getEnv('APP_URL'),
  credentials: true
};
app.use(cors(options));

app.use(cookieParser());

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

import { router as usersRouter } from '../src/domains/users/controllers/index';
app.use('/api/users', usersRouter);

import { router as artistsRouter } from '../src/domains/artists/controllers/index';
app.use('/api/artists', artistsRouter);

import { router as songsRouter } from '../src/domains/songs/controllers/index';
app.use('/api/songs', songsRouter);

import { router as usersSongsRouter } from '../src/domains/userSongs/controllers/index';
app.use('/api/users-songs', usersSongsRouter);

import { errorHandler } from '../src/middlewares/error-handler';
app.use(errorHandler);