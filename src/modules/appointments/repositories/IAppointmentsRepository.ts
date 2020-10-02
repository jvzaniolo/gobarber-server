import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthByProviderDTO from '../dtos/IFindAllInMonthByProviderDTO';
import IFindAllInDayByProviderDTO from '../dtos/IFindAllInDayByProviderDTO';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(data: Date): Promise<Appointment | undefined>;
  findByDate(data: Date): Promise<Appointment | undefined>;
  findAllInMonthByProvider(
    data: IFindAllInMonthByProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayByProvider(
    data: IFindAllInDayByProviderDTO,
  ): Promise<Appointment[]>;
}

export default IAppointmentsRepository;
