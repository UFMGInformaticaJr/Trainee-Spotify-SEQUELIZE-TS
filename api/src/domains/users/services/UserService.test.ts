import { UserService } from "./UserService";
import { User } from "../models/User";

const userData  = {
  id: '1',
  name: 'John Doe',
  email: 'teste@gmail.com',
  password: '123456',
  createdAt: new Date(),
  updatedAt: new Date(),
  role: 'admin',
};

const 

jest.mock('../models/User', () => {
  return {
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    save: jest.fn()
  };
});

describe('getById', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('método recebe um id e retorna o usuário correspondente', async () => {
    const id = 1;

    const usuario_retornado = await UserService.getById(id);

    expect(usuario_retornado).toStrictEqual(userData);
    expect(User.findByPk).toHaveBeenCalledTimes(1);
  });

});
