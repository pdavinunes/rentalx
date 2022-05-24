import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCateogoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export default (): CreateCateogoryController => {
  const categoriesRepository = new CategoriesRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  return new CreateCateogoryController(
    createCategoryUseCase
  );
}

