/* eslint-disable @typescript-eslint/no-unused-vars */
import {User} from '../models/User';
import {UserInterface} from '../models/User';
import {UserService} from './UserService';
import bcrypt from 'bcrypt';

jest.mock('../models/User', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findByPk: jest.fn(),
  },
}));

const mockHash = jest.spyOn(bcrypt, 'hash');

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

describe('create', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um objeto com as informações do usuário => chama o create com os dados corretos', async () => {
    const mockBodyUser = {
      name: 'Teste',
      email: '',
      password: '123456',
      role: 'user',
    } as UserInterface;
    
    const mockCreateUser = {
      name: 'Teste',
      email: '',
      password: '12345678',
      role: 'user',
    } as UserInterface;

    mockHash.mockImplementation(() => '12345678');

    (User.create as jest.MockedFunction<typeof User.create>).mockReturnValue({});
    
    await UserService.create(mockBodyUser);

    expect(User.create).toBeCalledWith(mockCreateUser);
    expect(User.create).toBeCalledTimes(1);
  });

  test('método recebe um usuário => cria um novo usuário com senha criptografada', async () => {
    const mockBodyUser = {
      name: 'Teste',
      email: '',
      password: '123456',
      role: 'user',
    } as UserInterface;

    (User.create as jest.MockedFunction<typeof User.create>).mockReturnValue({});
    const saltRounds = 10;
    await UserService.create(mockBodyUser);

    expect(mockHash.mock.calls[0]).toEqual([mockBodyUser.password, saltRounds]);
  });
});