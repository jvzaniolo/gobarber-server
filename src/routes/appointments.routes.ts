import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepo from '../repositories/AppointmentsRepo';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthentication from '../middlewares/ensureAuthentication';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthentication);

appointmentsRouter.get('/', async (_, response) => {
  const appointmentsRepo = getCustomRepository(AppointmentsRepo);
  const appointments = await appointmentsRepo.find();
  return response.status(200).json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  // provider = barbeiro
  const { provider_id, date } = request.body;

  // transformando 'date: string' para Date() com o parseISO()
  const dateISO = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    provider_id,
    date: dateISO,
  });

  return response.status(201).json(appointment);
});

export default appointmentsRouter;
