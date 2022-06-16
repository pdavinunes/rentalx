import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCarUseCase {

  constructor(
    @inject("CarsRepository")
    private carRepository: ICarsRepository
  ) { }

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICreateCarDTO): Promise<Car> {

    const carAlreadyExists = await this.carRepository.findByLicensePlate(license_plate);

    if (carAlreadyExists) {
      throw new AppError("Car already exists!")
    }

    return this.carRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })
  }
}

export { CreateCarUseCase }