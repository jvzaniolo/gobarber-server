import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProvider = container.resolve(ListProvidersService);

    const providers = await listProvider.execute({
      user_id,
    });

    return response.status(200).json(providers);
  }
}

export default ProvidersController;
