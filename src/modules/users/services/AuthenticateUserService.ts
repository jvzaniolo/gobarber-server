import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepo = getRepository(User);

    const user = await usersRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Given email is not valid.', 401);
    }

    const hasPassword = await compare(password, user.password);

    if (!hasPassword) {
      throw new AppError('Given password is not valid.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
