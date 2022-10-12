import { hash } from 'bcrypt';
import { User, UserInterface } from '../models/User';
import { Attributes } from 'sequelize/types';
import { userRoles } from '../constants/userRoles';
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { PermissionError } from '../../../../errors/PermissionError';
import { QueryError } from '../../../../errors/QueryError';
import { PayloadParams } from '../types/PayloadParams';

class UserServiceClass {
  async encryptPassword(password: string) {
    const saltRounds = 10;
    const encryptedPassword = await hash(password, saltRounds);
    return encryptedPassword;
  }

  async create(body: Attributes<UserInterface>) {
    if (body.role == userRoles.admin) {
      throw new PermissionError('Não é possível criar um usuário com cargo de administrador!');
    }

    const user = await User.findOne({where: {email: body.email}});
    if (user) {
      throw new QueryError('E-mail já cadastrado!');
    } else {
      const user = {
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
      };

      user.password = await this.encryptPassword(user.password);

      await User.create(user);
    }
  }

  async getAll() {
    const users = await User.findAll({

      attributes: ['id', 'name', 'email', 'role'],

    });

    if (!users) {
      throw new QueryError('Não há nenhum usuário cadastrado');
    } else {
      return users;
    }
  }

  async getById(id: string) {
    const user = await User.findByPk(id, {attributes:
      {
        exclude: ['password', 'createdAt', 'updatedAt'],
      }});

    if (user) {
      return user;
    }
    throw new QueryError(`Não há um usuário com o ID ${id}!`);
  }

  async update(id: string, body: Attributes<UserInterface>, loggedUser: PayloadParams){
    const user = await this.getById(id);

    if (loggedUser.role != userRoles.admin && loggedUser.id != id) {
      throw new NotAuthorizedError('Você não tem permissão para editar outro usuário!');
    }

    if (body.role && loggedUser.role != userRoles.admin) {
      throw new NotAuthorizedError('Você não tem permissão para editar seu cargo');
    }

    if (body.password) {
      body.password = await this.encryptPassword(body.password);
    }

    await user.update(body);
  }

  async delete(id: string, idReqUser: string) {
    if (idReqUser == id) {
      throw new PermissionError('Não é possível deletar o próprio usuário!');
    } else {
      const user = await this.getById(id);
      await user.destroy();
    }
  }
}

export const UserService = new UserServiceClass();