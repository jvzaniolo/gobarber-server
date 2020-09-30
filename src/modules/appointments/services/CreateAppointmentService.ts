/* eslint-disable prettier/prettier */
import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    // startOfHour zera todos os minutos e segundos dentro de uma hora.
    // a hora do agendamento deve ser inteira (Ex.: 16:00)
    const appointmentDate = startOfHour(date);

    const findAppointmentWithSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    // se achar algum agendamento com o mesmo horário, retorna erro
    if (findAppointmentWithSameDate) {
      throw new AppError('This hour is already booked');
    }

    // se não, cria um apontamento
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
