import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/middlewares/ensureAuthentication';
import AppointmentsController from '../controller/AppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthentication);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
