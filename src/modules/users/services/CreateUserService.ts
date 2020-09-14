import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepo: IUsersRepository) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const hasUser = await this.usersRepo.findByEmail(email);

    if (hasUser) {
      throw new AppError('Email address already used.');
    }

    const hashPassword = await hash(password, 8);

    const user = this.usersRepo.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUserService;
