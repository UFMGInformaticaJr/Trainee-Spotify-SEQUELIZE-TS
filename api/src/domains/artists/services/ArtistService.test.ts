/* eslint-disable @typescript-eslint/no-explicit-any */
import { Artist } from '../models/Artist';
import { ArtistInterface } from '../models/Artist';
import { ArtistService } from './ArtistService';
import { QueryError } from '../../../../errors/QueryError';

jest.mock('../models/Artist', () => ({
  Artist: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));


describe('create', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
    
  test('método recebe um objeto com as informações do artista => chama o create com os dados corretos', async () => {
    const mockBodyArtist = {
      name: 'Teste',
      nationality: 'Teste',
      image: 'Teste',
    } as ArtistInterface;

    (Artist.create as jest.MockedFunction<typeof Artist.create>).mockResolvedValue({});

    await ArtistService.create(mockBodyArtist);

    expect(Artist.create).toHaveBeenCalledWith(mockBodyArtist);
    expect(Artist.create).toHaveBeenCalledTimes(1);
  });
});

describe('getAll', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método é chamado => retorna os artistas', async () => {
    const mockArtists = [
      {
        id: '1',
        name: 'Teste',
        nationality: 'Teste',
        image: 'Teste',
      } as ArtistInterface,
      {
        id: '2',
        name: 'Teste2',
        nationality: 'Teste2',
        image: 'Teste2',
      } as ArtistInterface,
    ];
    
    (Artist.findAll as jest.MockedFunction<typeof Artist.findAll>).mockResolvedValue(mockArtists);

    const artists = await ArtistService.getAll();

    expect(artists).toEqual(mockArtists);
    expect(Artist.findAll).toHaveBeenCalledTimes(1);
  });

  test('método é chamado => retorna um erro', async () => {
    (Artist.findAll as any).mockResolvedValue(null);

    await expect(ArtistService.getAll()).rejects.toThrow(new QueryError('Não há nenhum artista cadastrado'));
  });
});

describe('getById', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id => retorna o artista correspondente', async () => {
    const id = '1';

    const mockArtist = {
      id: '1',
      name: 'Teste',
      nationality: 'Teste',
      image: 'Teste',
    } as ArtistInterface;

    (Artist.findByPk as jest.MockedFunction<typeof Artist.findByPk>).mockResolvedValue(mockArtist);

    const artist = await ArtistService.getById(id);

    expect(artist).toEqual(mockArtist);
    expect(Artist.findByPk).toHaveBeenCalledTimes(1);
  });

  test('método recebe um id inexistente => retorna um erro', async () => {
    const id = '1';
    
    (Artist.findByPk as any).mockResolvedValue(null);

    await expect(ArtistService.getById(id)).rejects.toThrow(new QueryError('Não há um artista com o ID 1!'));
  });
});

describe('update', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id e um objeto com as informações do artista => chama o update com os dados corretos', async () => {
    const id = '1';

    const mockBodyArtist = {
      name: 'Test',
      nationality: 'Test',
      image: 'Test',
    } as ArtistInterface;

    const artist = {
      id: '1',
      name: 'Teste',
      nationality: 'Teste',
      image: 'Teste',
      update: jest.fn(),
    };

    (Artist.findByPk as any).mockResolvedValue(artist);
    (Artist.update as any).mockResolvedValue({});

    await ArtistService.update(id, mockBodyArtist);

    expect(Artist.findByPk).toHaveBeenCalledWith(id);
    expect(artist.update).toHaveBeenCalledWith(mockBodyArtist);
    expect(artist.update).toHaveBeenCalledTimes(1);
  });
});

describe('delete', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id => chama o destroy com o id correto', async () => {
    const id = '1';

    const artist = {
      id: '1',
      name: 'Teste',
      nationality: 'Teste',
      image: 'Teste',
      destroy: jest.fn(),
    };

    (Artist.findByPk as any).mockResolvedValue(artist);
    (Artist.destroy as any).mockResolvedValue({});

    await ArtistService.delete(id);

    expect(Artist.findByPk).toHaveBeenCalledWith(id);
    expect(artist.destroy).toHaveBeenCalledTimes(1);
  });
});