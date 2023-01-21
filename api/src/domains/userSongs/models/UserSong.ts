import { sequelize } from '../../../../database/index';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { Song } from '../../songs/models/Song';
import { User } from '../../users/models/User';

interface UserSong extends Model<InferAttributes<UserSong>, InferCreationAttributes<UserSong>> {
  id: CreationOptional<string>;
  UserId: string;
  SongId: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>; 
}

export const UserSong = sequelize.define<UserSong>('UserSongs', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  SongId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Song,
      key: 'id'
    }
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

Song.belongsToMany(User, {
  through: UserSong,
});

User.belongsToMany(Song, {
  through: UserSong,
});

//Super Many-to-Many
Song.hasMany(UserSong);
UserSong.belongsTo(Song);
User.hasMany(UserSong);
UserSong.belongsTo(User);

UserSong.sync({alter: false, force: false})
  .then(() => {
    console.log('UserSong table was (re)created');
  })
  .catch((err) => console.log(err));
