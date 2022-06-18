import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const createSpecificationController = new CreateSpecificationController();

const specificationsRoutes = Router();

specificationsRoutes.post('/', ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export { specificationsRoutes };
