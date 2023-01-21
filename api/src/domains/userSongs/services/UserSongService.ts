import { UserSong } from '../models/UserSong';
import { UserService } from '../../users/services/UserService';
import { SongService } from '../../songs/services/SongService';
import { Song } from '../../songs/models/Song';
import { User } from '../../users/models/User';

class UserSongServiceClass  {
  async create(userId: string, songId: string){
    const user = await UserService.getById(userId);
    const song = await SongService.getById(songId);

    await UserSong.create({
      UserId: user.id,
      SongId: song.id,
    });
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
        attributes: ['id'],
        through: {
          attributes: [],
        }
      },
    });

    return allSongs;
  }

  async getAllUsersBySong(songId: string){
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      include: {
        model: Song,

        where: {
          id: songId,
        },
        attributes: ['id'],
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
  }
}

export const UserSongService = new UserSongServiceClass();