/* eslint-disable prettier/prettier */
import fs from 'fs';
import path from 'path';

import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepo: IUsersRepository,
  ) { }

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepo.findById(user_id);

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

    await this.usersRepo.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
