import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvaiableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listAvaiableCarsUseCase = container.resolve(ListAvailableCarsUseCase)

    const cars = await listAvaiableCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string
    })

    return response.json(cars)
  }

}

export { ListAvaiableCarsController }