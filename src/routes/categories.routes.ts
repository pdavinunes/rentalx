import {Router} from 'express';
import multer from 'multer';

import {createCateogoryController} from '../modules/cars/useCases/createCateogory';
import {importCategoryController} from '../modules/cars/useCases/importCategory';
import {listCategoriesController} from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

const upload = multer({dest: './tmp'});

categoriesRoutes.post('/', (request, response) => {
  return createCateogoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response);
});

export {categoriesRoutes};
