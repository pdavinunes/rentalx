import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvaiableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvaiableCarsController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvaiableCarsController = new ListAvaiableCarsController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.get(
  "/avaiable",
  listAvaiableCarsController.handle
)

export { carsRoutes }