import Notification from '../infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';

interface INotificationsRepository {
  create(date: ICreateNotificationDTO): Promise<Notification>;
}

export default INotificationsRepository;
