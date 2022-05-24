import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from '../ICategoriesRepository';

import { Repository } from 'typeorm'
import dataSource from '../../../../database/data-source';

class CategoriesRepository implements ICategoriesRepository {

  private repository: Repository<Category>;

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.findOneBy({ name })
  }
}

export { CategoriesRepository };
