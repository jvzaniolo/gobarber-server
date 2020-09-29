import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user info', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'john.tre@gmail.com',
    });

    expect(updatedUser.name).toBe('John Tre');
    expect(updatedUser.email).toBe('john.tre@gmail.com');
  });

  it('should NOT be able to change email to an existing one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'John Four',
      email: 'john.fourth@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'john.fourth@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'john.tre@gmail.com',
      password: '654321',
      old_password: '123456',
    });

    expect(updatedUser.name).toBe('John Tre');
    expect(updatedUser.password).toBe('654321');
  });

  it('should NOT be able to update password without previous one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'john.tre@gmail.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update password with wrong previous one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'john.tre@gmail.com',
        password: '654321',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
