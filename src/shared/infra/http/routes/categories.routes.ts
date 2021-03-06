import { Router } from 'express';
import multer from 'multer';

import { CreateCateogoryController } from '@modules/cars/useCases/createCateogory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const categoriesRoutes = Router();

const upload = multer({ dest: './tmp' });

const createCateogoryController = new CreateCateogoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, createCateogoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/import', ensureAuthenticated, ensureAdmin, upload.single('file'), importCategoryController.handle);

export { categoriesRoutes };
