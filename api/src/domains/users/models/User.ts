import {sequelize} from '../../../../database/index.js';
import {DataTypes} from 'sequelize';
import {userRoles} from '../constants/userRoles.js';

export const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: [userRoles.admin, userRoles.user],
    allowNull: false,
  },
});

/*
Comando para criar/alterar as
colunas da tabela caso necessário
 */
User.sync({alter: false, force: false})
  .then(() => {
    console.log('User table was (re)created');
  })
  .catch((err) => console.log(err));