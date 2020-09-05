import { UserService } from '../services';
import { UserRepository } from '../data-access';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const userController = {
  getUser: async (req, res) => {
    const { id } = req.params;
    const user = await userService.findById(id);
    if (user) return res.send(user);
    res.status(404).send(`user ${id} unknow`);
  },

  getUsers: async (req, res) => {
    const { substring, limit } = req.query;
    const users = await userService.findByParams(substring, limit);
    res.send(users);
  },

  createUser: async (req, res) => {
    const { login, password, age } = req.body;
    const user = await userService.create({ login, password, age });
    res.status(201).send(user);
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { login, password, age } = req.body;
    const isUpdate = await userService.update(id, { login, password, age });
    if (isUpdate) res.send(`user ${id} update`);
    res.status(404).send(`user ${id} unknow`);
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    const isDelete = await userService.removeById(id);
    if (isDelete) res.send(`user ${id} delete`);
    res.status(404).send(`user ${id} unknow`);
  }
};
