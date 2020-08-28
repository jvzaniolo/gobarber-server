import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    return response.json({ ok: 'true' });
  },
);

export default usersRouter;
