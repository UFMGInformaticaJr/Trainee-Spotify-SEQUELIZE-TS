import {User} from '../models/User';
import {UserInterface} from '../models/User';
import {UserService} from './UserService';


jest.mock('../models/User', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findByPk: jest.fn(),
  },
}));



describe('getById', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id e retorna o usuário correspondente', async () => {
    const id = '1';

    const user = {
      id: '1',
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as UserInterface;
    
      
  
    (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(user);

    const result = await UserService.getById(id);

    expect(result).toEqual(user);

    expect(User.findByPk).toHaveBeenCalledTimes(1);
    
  });

});
