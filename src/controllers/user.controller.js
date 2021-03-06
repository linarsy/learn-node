import { userService } from './setup';

export const userController = {
  getUser: async (req, res) => {
    const { id } = req.params;
    const user = await userService.findById(id);
    res.send(user);
  },

  getUsers: async (req, res) => {
    const { substring, limit } = req.query;
    const users = await userService.findByParams(substring, limit);
    res.send(users);
  },

  createUser: async (req, res) => {
    const { login, password, age } = req.body;
    const user = await userService.create({ login, password, age });
    res.status(201);
    res.send(user);
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { login, password, age } = req.body;
    await userService.updateById(id, { login, password, age });
    res.send(`user ${id} is updated`);
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    await userService.removeById(id);
    res.send(`user ${id} is deleted`);
  }
};
