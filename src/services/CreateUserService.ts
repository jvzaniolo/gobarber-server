import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepo = getRepository(User);

    const hasUser = await usersRepo.findOne({
      where: { email },
    });

    if (hasUser) {
      throw new Error('Email address already used.');
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepo.create({
      name,
      email,
      password: hashPassword,
    });

    await usersRepo.save(user);

    return user;
  }
}

export default CreateUserService;
