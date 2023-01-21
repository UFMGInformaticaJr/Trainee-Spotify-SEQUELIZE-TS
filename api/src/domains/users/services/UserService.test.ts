/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../models/User';
import { UserInterface } from '../models/User';
import { UserService } from './UserService';
import { QueryError } from '../../../../errors/QueryError';
import { PermissionError } from '../../../../errors/PermissionError';
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import bcrypt from 'bcrypt';

jest.mock('../models/User', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findByPk: jest.fn(),
    findAll: jest.fn(),
  },
}));

const mockHash = jest.spyOn(bcrypt, 'hash');

describe('encryptPassword', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe uma senha => retorna a senha criptografada', async () => {
    const password = '123456';

    mockHash.mockImplementation(() => '12345678');

    const encrypted = await UserService.encryptPassword(password);
    
    expect(encrypted).toEqual('12345678');
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
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

    (User.create as jest.MockedFunction<typeof User.create>).mockResolvedValue({});
    
    await UserService.create(mockBodyUser);

    expect(User.create).toHaveBeenCalledWith(mockCreateUser);
    expect(User.create).toHaveBeenCalledTimes(1) ;
  });

  test('método recebe um usuário com role admin => retorna um erro', async () => {
    const mockBodyUser = {
      name: 'Teste',
      email: '',
      password: '123456',
      role: 'admin',
    } as UserInterface;

    await expect(UserService.create(mockBodyUser)).rejects.toThrowError(new PermissionError('Não é possível criar um usuário com cargo de administrador!'));
  });

  test('método recebe um usuário com email já cadastrado => retorna um erro', async () => {
    const mockUser = {
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
      role: 'user',
    } as UserInterface;

    (User.findOne as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(mockUser);

    await expect(UserService.create(mockUser)).rejects.toThrowError(new QueryError('E-mail já cadastrado!'));
  });   
});

describe('getAll', () => { 
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método é chamado => retorna todos os usuários', async () => {
    const users = [
      {
        id: '1',
        name: 'Teste',
        email: 'Teste',
        role: 'user',
      } as UserInterface,
      {
        id: '2',
        name: 'Teste2',
        email: 'Teste2',
        role: 'user',
      } as UserInterface,
    ];

    (User.findAll as jest.MockedFunction<typeof User.findAll>).mockResolvedValue(users);

    const result = await UserService.getAll();

    expect(result).toEqual(users);
    expect(User.findAll).toHaveBeenCalledTimes(1);
  });

  test('método é chamado sem haver usuários no sistema => retorna um erro', async () => {
    (User.findAll as any).mockResolvedValue(null);

    await expect(UserService.getAll()).rejects.toThrowError(new QueryError('Não há nenhum usuário cadastrado'));
  });
});

describe('getById', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id => retorna o usuário correspondente', async () => {
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

  test('método recebe um id que não existe => retorna um erro', async () => {
    const id = '1';

    (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue(null);

    await expect(UserService.getById(id)).rejects.toThrowError(new QueryError('Não há um usuário com o ID 1!'));
  });
});

describe('update', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id, um objeto com as informações do usuário e o usuario logado => chama o update com os dados corretos', async () => {
    const id = '1';
    const loggedUser = {
      id: '1',
      name: 'Teste',
      email: 'teste@teste.com',
      role: 'user',
    };

    const mockBody = {
      name: 'Teste2',
      email: 'teste2@teste.com',
      password: '1234567',
    } as UserInterface;
    
    const user = {
      id: '1',
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      update: jest.fn(),
    };

    mockHash.mockImplementation(() => '12345678');

    (User.findByPk as any).mockResolvedValue(user);
    (user.update as any).mockResolvedValue({});

    await UserService.update(id, mockBody, loggedUser);

    expect(User.findByPk).toHaveBeenCalledTimes(1);
    expect(user.update).toHaveBeenCalledTimes(1);
    expect(user.update).toHaveBeenCalledWith(mockBody);
  });

  test('método recebe um body com o campo senha => criptografa a nova senha', async () => {
    const id = '1';
    const loggedUser = {
      id: '1',
      name: 'Teste',
      email: '',
      role: 'user',
    };

    const mockBody = {
      password: '123456',
    } as UserInterface;
    
    const user = {
      id: '1',
      name: 'Teste',
      email: '',
      password: '123456',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      update: jest.fn(),
    };

    mockHash.mockImplementation(() => '12345678');

    (User.findByPk as any).mockResolvedValue(user);
    (user.update as any).mockResolvedValue({});
    
    await UserService.update(id, mockBody, loggedUser);

    expect(mockHash).toHaveBeenCalledTimes(1);
    expect(mockBody.password).toBe('12345678');
  });

  test('método recebe um usuário que não é admin tentando editar outro usuário => retorna um erro', async () => {
    const id = '1';
    const loggedUser = {
      id: '2',
      name: 'Teste',
      email: '',
      role: 'user',
    };

    const body = {} as UserInterface;

    await expect(UserService.update(id, body, loggedUser)).rejects.toThrowError(new NotAuthorizedError('Você não tem permissão para editar outro usuário!'));
  });

  test('método recebe um usuário que não é admin tentando editar seu cargo => retorna um erro', async () => {
    const id = '1';
    const loggedUser = {
      id: '1',
      name: 'Teste',
      email: '',
      role: 'user',
    };

    const body = {
      name: '',
      email: '',
      password: '',
      role: 'admin',
    } as UserInterface;

    await expect(UserService.update(id, body, loggedUser)).rejects.toThrowError(new NotAuthorizedError('Você não tem permissão para editar seu cargo!'));
  });

});

describe('delete', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id => deleta o usuário correspondente', async () => {
    const id = '1';
    const idReqUser = '2';

    const user = {
      id: '1',
      name: 'Teste',
      email: '',
      password: '',
      role: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      destroy: jest.fn(),
    };

    (User.findByPk as any).mockResolvedValue(user);

    await UserService.delete(id, idReqUser);

    expect(User.findByPk).toHaveBeenCalledTimes(1);
    expect(user.destroy).toHaveBeenCalledTimes(1);
  });

  test('método recebe id == idReqUser => retorna um erro', async () => {
    const id = '1';
    const idReqUser = '1';

    await expect(UserService.delete(id, idReqUser)).rejects.toThrow(new PermissionError('Não é possível deletar o próprio usuário!'));
  });
});