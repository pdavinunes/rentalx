import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import dataSource from "@shared/infra/typeorm/data-source";
import { IsNull, Not, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {

  private repository: Repository<Rental>

  constructor() {
    this.repository = dataSource.getRepository(Rental)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: {
        car_id,
        end_date: IsNull()
      }
    })
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: {
        user_id,
        end_date: IsNull()
      }
    })
  }

  async create({ car_id, expected_return_date, user_id, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {
    const rental = await this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      total,
      end_date
    })

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const [rental] = await this.repository.find({
      where: {
        id,
        end_date: IsNull()
      }
    })
    return rental
  }

  findByUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({
      where: {
        user_id
      },
      relations: ["car"]
    })
  }
}

export { RentalsRepository }