import { sequelize } from '../../../../database';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { defaultImage } from '../constants/defaultImage';

export interface ArtistInterface extends Model<InferAttributes<ArtistInterface>, InferCreationAttributes<ArtistInterface>> {
  id: CreationOptional<string>;
  name: string;
  nationality: string;
  image: string; 
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

export const Artist = sequelize.define<ArtistInterface>('Artist', {
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
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: defaultImage,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Artist.sync({alter: false, force: false})
  .then(() => {
    console.log('Artist table was (re)created');
  })
  .catch((err) => console.log(err));

