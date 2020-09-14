import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepo from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepo';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthentication from '@modules/users/infra/middlewares/ensureAuthentication';

const appointmentsRouter = Router();

const appointmentsRepo = new AppointmentsRepo();

appointmentsRouter.use(ensureAuthentication);

// appointmentsRouter.get('/', async (_, response) => {
//   const appointments = await appointmentsRepo.find();
//   return response.status(200).json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  // provider = barbeiro
  const { provider_id, date } = request.body;

  // transformando 'date: string' para Date() com o parseISO()
  const dateISO = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmentsRepo);

  const appointment = await createAppointment.execute({
    provider_id,
    date: dateISO,
  });

  return response.status(201).json(appointment);
});

export default appointmentsRouter;
