import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // provider = barbeiro
    const { provider_id, date } = request.body;

    // transformando 'date: string' para Date() com o parseISO()
    const dateISO = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      date: dateISO,
    });

    return response.status(201).json(appointment);
  }
}

export default AppointmentsController;
