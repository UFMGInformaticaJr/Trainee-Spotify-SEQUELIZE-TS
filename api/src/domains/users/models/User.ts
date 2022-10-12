import { sequelize } from '../../../../database/index.js';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { userRoles } from '../constants/userRoles.js';

interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const User = sequelize.define<User>('Users', {
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