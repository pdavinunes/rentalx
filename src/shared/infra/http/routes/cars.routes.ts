import { Router } from "express";
import multer from "multer";

import uploadConfig from '@config/upload';

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvaiableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvaiableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";


const upload = multer(uploadConfig.upload("./tmp/cars"))

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvaiableCarsController = new ListAvaiableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

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

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
)

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
)

export { carsRoutes }