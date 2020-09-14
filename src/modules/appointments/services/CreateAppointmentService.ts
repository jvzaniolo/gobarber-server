import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepo from '../repositories/AppointmentsRepo';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepo = getCustomRepository(AppointmentsRepo);

    // startOfHour zera todos os minutos e segundos dentro de uma hora.
    // a hora do agendamento deve ser inteira (Ex.: 16:00)
    const appointmentDate = startOfHour(date);

    const findAppointmentWithSameDate = await appointmentsRepo.findByDate(
      appointmentDate,
    );

    // se achar algum agendamento com o mesmo horário, retorna erro
    if (findAppointmentWithSameDate) {
      throw new AppError('This hour is already booked');
    }

    // se não, cria um apontamento
    const appointment = appointmentsRepo.create({
      provider_id,
      date: appointmentDate,
    });

    // salva no banco um novo appointment
    await appointmentsRepo.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
