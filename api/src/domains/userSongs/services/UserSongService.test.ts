/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../users/models/User';
import { Song } from '../../songs/models/Song';
import { UserSong } from '../models/UserSong';
import { UserSongService } from './UserSongService';

jest.mock('../models/UserSong', () => ({
  UserSong: {
    create: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
  },
}));

jest.mock('../../users/models/User', () => ({
  User: {
    findByPk: jest.fn(),
    findAll: jest.fn(),
  },
}));

jest.mock('../../songs/models/Song', () => ({
  Song: {
    findByPk: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe('create', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id de usuário e um id de música => chama o create com os dados corretos', async () => {
    const userId = '1';
    const songId = '1';
    
    (User.findByPk as any).mockResolvedValue({});
    (Song.findByPk as any).mockResolvedValue({});
    (UserSong.create as jest.MockedFunction<typeof UserSong.create>).mockResolvedValue({});

    await UserSongService.create(userId, songId);

    expect(UserSong.create).toHaveBeenCalledTimes(1);
  });
});

describe('getAllSongsByUser', () => {  
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id de usuário => chama o findAll com os dados corretos', async () => {
    const userId = '1';
    
    const mockUserSongs = [
      {
        id: '2',
        title: 'Teste',
        cover_image: 'teste.jpg',
        artist_id: '1',
        genre: 'Rock',
        Users: [
          {
            id: '1',
          }
        ]
      }
    ];

    (Song.findAll as any).mockResolvedValue(mockUserSongs);

    const userSongs = await UserSongService.getAllSongsByUser(userId);

    expect(Song.findAll).toHaveBeenCalledTimes(1);
    expect(userSongs).toEqual(mockUserSongs);
  });
});

describe('getAllUsersBySong', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id de música => chama o findAll com os dados corretos', async () => {
    const songId = '1';
    
    const mockUserSongs = [
      {
        id: '2',
        name: 'Teste',
        email: 'teste@teste.com',
        role: 'user',
        genre: 'Rock',
        Users: [
          {
            id: '1',
          }
        ]
      }
    ];
    
    (User.findAll as any).mockResolvedValue(mockUserSongs);

    const userSongs = await UserSongService.getAllUsersBySong(songId);

    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(userSongs).toEqual(mockUserSongs);
  });
});

describe('delete', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id de usuário e um id de música => chama o destroy com os dados corretos', async () => {
    const UserId = '1';
    const SongId = '1';

    (Song.findByPk as any).mockResolvedValue({id: SongId});
    (User.findByPk as any).mockResolvedValue({id: UserId});
    (UserSong.destroy as any).mockResolvedValue({});

    await UserSongService.delete(UserId, SongId);

    expect(Song.findByPk).toHaveBeenCalledTimes(1);
    expect(User.findByPk).toHaveBeenCalledTimes(1);
    expect(UserSong.destroy).toHaveBeenCalledTimes(1);
    expect(UserSong.destroy).toHaveBeenCalledWith({where: {UserId, SongId}});
  });
});