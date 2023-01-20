/* eslint-disable @typescript-eslint/no-explicit-any */
import {Song} from '../models/Song';
import {SongInterface} from '../models/Song';
import {SongService} from './SongService';

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

    expect(Song.create).toBeCalledWith(mockBodySong);
    expect(Song.create).toBeCalledTimes(1);
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
        title: 'Teste',
        cover_image: 'Teste',
        artist_id: 'Teste',
        genre: 'Teste',
      } as SongInterface,
      {
        title: 'Teste2',
        cover_image: 'Teste2',
        artist_id: 'Teste2',
        genre: 'Teste2',
      } as SongInterface,
    ];
    (Song.findAll as jest.MockedFunction<typeof Song.findAll>).mockResolvedValue(mockSongs);
    
    const songs = await SongService.getAll();

    expect(Song.findAll).toBeCalledTimes(1);
    expect(songs).toEqual(mockSongs);
  });

  test('método é chamado sem haver músicas no sistema => retorna um erro', async () => {
    (Song.findAll as any).mockResolvedValue(null);
    
    await expect(SongService.getAll()).rejects.toThrow('Não há nenhuma música cadastrada');
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

    await expect(SongService.getById(id)).rejects.toThrow('Não há uma música com o ID 1!');
  });
});

describe('getRandom', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método é chamado => retorna uma música aleatória', async () => {
    (Song.findOne as any).mockResolvedValue({});

    expect(Song.findOne).toHaveBeenCalledTimes(1);
  });
});
