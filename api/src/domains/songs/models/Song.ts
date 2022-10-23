import { sequelize } from '../../../../database';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin} from 'sequelize';
import { Artist } from '../../artists/models/Artist';
import { UserInterface } from '../../users/models/User.js';
import { defaultImage } from '../constants/defaultImage';

export interface SongInterface extends Model<InferAttributes<SongInterface>, InferCreationAttributes<SongInterface>> {
  id: CreationOptional<string>;
  title: string;
  cover_image: string;
  artist_id: string;
  genre: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
  addUser: HasManyAddAssociationMixin<UserInterface, UserInterface['id']>;
  removeUser: HasManyRemoveAssociationMixin<UserInterface, UserInterface['id']>;
}

export const Song = sequelize.define<SongInterface>('Songs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cover_image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: defaultImage,
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genre: { 
    type: DataTypes.STRING,
    allowNull: false,
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

Song.belongsTo(Artist, {
  foreignKey: 'artist_id',
});

Artist.hasMany(Song, {
  foreignKey: 'artist_id',
});

/*
Comando para criar/alterar as
colunas da tabela caso necessário
 */
Song.sync({alter: false, force: false})
  .then(() => {
    console.log('Song table was (re)created');
  })
  .catch((err) => console.log(err));