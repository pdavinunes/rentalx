import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { CreateCateogoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const categoriesRepository = new CategoriesRepository();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createCateogoryController = new CreateCateogoryController(
  createCategoryUseCase,
);

export { createCateogoryController };
