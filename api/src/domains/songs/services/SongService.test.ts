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
