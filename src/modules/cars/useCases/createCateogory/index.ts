import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCateogoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createCateogoryController = new CreateCateogoryController(
  createCategoryUseCase,
);

export { createCateogoryController };
