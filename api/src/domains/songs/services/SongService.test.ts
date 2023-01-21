/* eslint-disable @typescript-eslint/no-explicit-any */
import { Song } from '../models/Song';
import { SongInterface } from '../models/Song';
import { SongService } from './SongService';
import { QueryError } from '../../../../errors/QueryError';

jest.mock('../models/Song', () => ({
  Song: {
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findByPk: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe('create', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um objeto com as informações do usuário => chama o create com os dados corretos', async () => {
    const mockBodySong = {
      title: 'Teste',
      cover_image: 'Teste',
      artist_id: 'Teste',
      genre: 'Teste',
    } as SongInterface;

    (Song.create as jest.MockedFunction<typeof Song.create>).mockResolvedValue({});
    
    await SongService.create(mockBodySong);

    expect(Song.create).toHaveBeenCalledWith(mockBodySong);
    expect(Song.create).toHaveBeenCalledTimes(1);
  });   
});

describe('getAll', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método é chamado => retorna as músicas', async () => {
    const mockSongs = [
      {
        id: '1',
        title: 'Teste',
        cover_image: 'Teste',
        artist_id: 'Teste',
        genre: 'Teste',
      } as SongInterface,
      {
        id: '2',
        title: 'Teste2',
        cover_image: 'Teste2',
        artist_id: 'Teste2',
        genre: 'Teste2',
      } as SongInterface,
    ];

    (Song.findAll as jest.MockedFunction<typeof Song.findAll>).mockResolvedValue(mockSongs);
    
    const songs = await SongService.getAll();

    expect(Song.findAll).toHaveBeenCalledTimes(1);
    expect(songs).toEqual(mockSongs);
  });

  test('método é chamado sem haver músicas no sistema => retorna um erro', async () => {
    (Song.findAll as any).mockResolvedValue(null);
    
    await expect(SongService.getAll()).rejects.toThrow(new QueryError('Não há nenhuma música cadastrada'));
  });
});

describe('getById', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id => retorna a música correspondente', async () => {
    const id = '1';

    const mockSong = {
      id: '1',
      title: 'Teste',
      cover_image: 'Teste',
      artist_id: 'Teste',
      genre: 'Teste',
    } as SongInterface;
  
    (Song.findByPk as jest.MockedFunction<typeof Song.findByPk>).mockResolvedValue(mockSong);

    const result = await SongService.getById(id);

    expect(result).toEqual(mockSong);
    expect(Song.findByPk).toHaveBeenCalledTimes(1);    
  });

  test('método recebe um id que não existe => retorna um erro', async () => {
    const id = '1';

    (Song.findByPk as jest.MockedFunction<typeof Song.findByPk>).mockResolvedValue(null);

    await expect(SongService.getById(id)).rejects.toThrow(new QueryError('Não há uma música com o ID 1!'));
  });
});

describe('getRandom', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método é chamado => retorna uma música aleatória', async () => {
    (Song.findAll as any).mockResolvedValue({});
  
    await SongService.getRandom();
    expect(Song.findAll).toHaveBeenCalledTimes(1);
  });
});

describe('getSongsByArtist', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id => retorna as músicas do artista correspondente', async () => {
    const artistId = '1';

    const mockSongs = [
      {
        id: '1',
        title: 'Teste',
        cover_image: 'Teste',
        artist_id: artistId,
        genre: 'Teste',
      } as SongInterface,
      {
        id: '2',
        title: 'Teste2',
        cover_image: 'Teste2',
        artist_id: artistId,
        genre: 'Teste2',
      } as SongInterface,
    ];
  
    (Song.findAll as jest.MockedFunction<typeof Song.findAll>).mockResolvedValue(mockSongs);

    const result = await SongService.getSongsByArtist(artistId);

    expect(result).toEqual(mockSongs);
    expect(Song.findAll).toHaveBeenCalledTimes(1);
  });

  test('método recebe um id que não existe => retorna um erro', async () => {
    const id = '1';

    (Song.findAll as any).mockResolvedValue(null);

    await expect(SongService.getSongsByArtist(id)).rejects.toThrow(new QueryError('Não há nenhuma música do artista com o ID 1!'));
  });
});

describe('update', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id e um objeto com as informações da música => chama o update com os dados corretos', async () => {
    const id = '1';

    const mockBodySong = {
      title: 'Teste',
      cover_image: 'Teste',
      artist_id: 'Teste',
      genre: 'Teste',
    } as SongInterface;

    const song = {
      id: '1',
      title: 'Teste',
      cover_image: 'Teste',
      artist_id: 'Teste',
      genre: 'Teste',
      update: jest.fn(),
    };

    (Song.findByPk as any).mockResolvedValue(song);
    (Song.update as any).mockResolvedValue({});
    
    await SongService.update(id, mockBodySong);

    expect(Song.findByPk).toHaveBeenCalledTimes(1);
    expect(song.update).toHaveBeenCalledTimes(1);
    expect(song.update).toHaveBeenCalledWith(mockBodySong);
  });
}); 

describe('delete', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id => chama o destroy com o id correto', async () => {
    const id = '1';

    const song = {
      id: '1',
      title: 'Teste',
      cover_image: 'Teste',
      artist_id: 'Teste',
      genre: 'Teste',
      destroy: jest.fn(),
    };

    (Song.findByPk as any).mockResolvedValue(song);
    (Song.destroy as any).mockResolvedValue({});
    
    await SongService.delete(id);

    expect(Song.findByPk).toHaveBeenCalledTimes(1);
    expect(song.destroy).toHaveBeenCalledTimes(1);
  });
});