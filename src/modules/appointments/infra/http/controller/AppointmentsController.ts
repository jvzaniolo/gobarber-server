import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      user_id,
      provider_id,
      date,
    });

    return response.status(201).json(appointment);
  }
}

export default AppointmentsController;
