import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }
  async handle(_request: Request, response: Response): Promise<Response> {
    const categories = await this.listCategoriesUseCase.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
