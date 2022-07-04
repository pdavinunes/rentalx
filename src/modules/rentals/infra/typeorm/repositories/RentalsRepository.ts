import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import dataSource from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {

  private repository: Repository<Rental>

  constructor() {
    this.repository = dataSource.getRepository(Rental)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOneBy({ car_id })
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOneBy({ user_id })
  }

  async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental> {
    const rental = await this.repository.create({
      car_id,
      expected_return_date,
      user_id
    })

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    console.log(id)
    const rental = await this.repository.findOneBy({ id })
    console.log(rental)
    return rental
  }
}

export { RentalsRepository }