import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import dataSource from "@shared/infra/typeorm/data-source";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>

  constructor() {
    this.repository = dataSource.getRepository(Car)
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id
    })

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOneBy({ license_plate });
  }

  async findAvaiable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("c.avaiable = :avaiable", { avaiable: true })

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand: brand })
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name: name })
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id: category_id })
    }

    return carsQuery.getMany();
  }

  async findById(car_id: string): Promise<Car> {
    return this.repository.findOneBy({ id: car_id })
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ avaiable: available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository }