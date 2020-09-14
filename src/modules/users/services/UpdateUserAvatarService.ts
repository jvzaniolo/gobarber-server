import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepo = getRepository(User);

    const user = await usersRepo.findOne(user_id);

    if (!user) {
      throw new AppError('User is not authenticated.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepo.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
