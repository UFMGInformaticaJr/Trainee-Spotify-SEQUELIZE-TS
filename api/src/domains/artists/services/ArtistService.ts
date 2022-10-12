import { Artist, ArtistInterface } from "../models/Artist";
import { QueryError } from "../../../../errors/QueryError";
import { Attributes } from "sequelize/types";

class ArtistServiceClass {
  async create(body: Attributes<ArtistInterface>){
    const artist = {
      name: body.name,
      nationality: body.nationality,
      image: body.image,
    };
    await Artist.create(artist);
  }

  async getAll(){
    const artists = await Artist.findAll();

    if(!artists){
      throw new QueryError('Não há nenhum artista cadastrado');
    }

    return artists;
  }

  async getById(id: string){
    const artist = await Artist.findByPk(id);

    if(!artist){
      throw new QueryError(`Não há um artista com o ID ${id}!`);
    }

    return artist;
  }

  async update(id: string, body: Attributes<ArtistInterface>){
    const artist = await this.getById(id);
    await artist.update(body);
  }

  async delete(id: string){
    const artist = await this.getById(id);
    await artist.destroy();
  }

}

export const ArtistService = new ArtistServiceClass();