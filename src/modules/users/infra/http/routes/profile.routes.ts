import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';
import ensureAuthentication from '../../middlewares/ensureAuthentication';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthentication);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.when('old_password', {
        then: Joi.string().required(),
        otherwise: Joi.optional(),
      }),
      password_confirmation: Joi.when('password', {
        then: Joi.string().required().valid(Joi.ref('password')),
        otherwise: Joi.optional(),
      }),
    },
  }),
  profileController.update,
);

export default profileRouter;
