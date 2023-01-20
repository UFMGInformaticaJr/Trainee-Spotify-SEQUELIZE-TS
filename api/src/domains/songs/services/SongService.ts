import { Song, SongInterface } from '../models/Song';
import { Attributes } from 'sequelize/types';
import { QueryError } from '../../../../errors/QueryError';

class SongServiceClass {
  async create(body: Attributes<SongInterface>) {
    const song = {
      title: body.title,
      cover_image: body.cover_image,
      artist_id: body.artist_id,
      genre: body.genre,
    };

    await Song.create(song);
  }

  async getAll() {
    const songs = await Song.findAll();

    if (!songs) {
      throw new QueryError('Não há nenhuma música cadastrada');
    }

    return songs;
  }

  async getById(id: string) {
    const song = await Song.findByPk(id);

    if (!song) {
      throw new QueryError(`Não há uma música com o ID ${id}!`);
    }

    return song;
  }

  async getRandom() {
    const songs = await this.getAll();
    const randomIndex = Math.floor(Math.random() * songs.length);
    const song = songs[randomIndex];

    return song;
  }

  async getSongsByArtist(artistId: string) {
    const songs = await Song.findAll({
      where: {
        artist_id: artistId
      }
    });

    if (!songs) {
      throw new QueryError(`Não há nenhuma música do artista com o ID ${artistId}!`);
    }

    return songs;
  }

  async update(id: string, body: Attributes<SongInterface>) {
    const song = await this.getById(id);
    await song.update(body);
  }

  async delete(id: string) {
    const song = await this.getById(id);
    await song.destroy();
  }
}

export const SongService = new SongServiceClass();