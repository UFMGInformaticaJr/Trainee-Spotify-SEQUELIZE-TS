import { UserSong } from '../models/UserSong';
import { UserService } from '../../users/services/UserService';
import { SongService } from '../../songs/services/SongService';
import { Song } from '../../songs/models/Song';
import { User } from '../../users/models/User';

// Descomentar a linha abaixo se for utilizar as funções geradas pelo sequelize song.addUser e song.removeUser

// UserSong.sync({alter: true, force: false});

class UserSongServiceClass  {
  async create(userId: string, songId: string){
    const user = await UserService.getById(userId);
    const song = await SongService.getById(songId);
    await UserSong.create({
      UserId: user.id,
      SongId: song.id,
    });

    // await song.addUser(user);
  }

  async getAllSongsByUser(userId: string){
    const allSongs = await Song.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: User,
        where: {
          id: userId,
        },

        through: {
          attributes: [],
        },

      }
    });

    return allSongs;
  }

  async getAllUsersBySong(songId: string){
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Song,

        where: {
          id: songId,
        },
        through: {
          attributes: [],
        },

      },
    });

    return allUsers;
  }

  async delete(userId: string, songId: string){
    const user = await UserService.getById(userId);
    const song = await SongService.getById(songId);
    await UserSong.destroy({
      where: {
        UserId: user.id,
        SongId: song.id,
      }
    });

    // await song.removeUser(user);
  }
}

export const UserSongService = new UserSongServiceClass();