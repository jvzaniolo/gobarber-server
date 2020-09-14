import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepo extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    // procura no banco
    // um agendamento com o horário 'date'
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepo;
