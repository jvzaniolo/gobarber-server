import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover password by email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: 'john.doe@gmail.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should NOT be able to recover password from a non-existing email', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'john.doe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a token when recovering password', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const createdUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john.doe@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(createdUser.id);
  });
});
