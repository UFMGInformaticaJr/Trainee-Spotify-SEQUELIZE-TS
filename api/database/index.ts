import { Sequelize } from 'sequelize';
import { getEnv } from '../constants/getEnv';
export const sequelize = new Sequelize(
  getEnv('DB'),
  getEnv('DB_USER'),
  getEnv('DB_PASSWORD'),
  {
    host: getEnv('DB_HOST'),
    dialect: 'mysql',
    timezone: '-03:00',
  },
);