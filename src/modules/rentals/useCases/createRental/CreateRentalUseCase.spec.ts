import dayjs from "dayjs"

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider;
describe("Create Rental", () => {

  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    )
  })

  it("should be able to create a new rental", async () => {

    const payload = {
      user_id: '123',
      car_id: '123',
      expected_return_date: dayAdd24Hours
    }

    const rental = await createRentalUseCase.execute(payload)

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if user have a open rental", async () => {
    expect(async () => {
      const payload = {
        user_id: '123',
        car_id: '123',
        expected_return_date: dayAdd24Hours
      }

      await createRentalUseCase.execute(payload)
      await createRentalUseCase.execute({ ...payload, car_id: '234' })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental with the car in use", async () => {
    expect(async () => {
      const payload = {
        user_id: '123',
        car_id: '123',
        expected_return_date: dayAdd24Hours
      }

      await createRentalUseCase.execute(payload)
      await createRentalUseCase.execute({ ...payload, user_id: '234' })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      const payload = {
        user_id: '123',
        car_id: '123',
        expected_return_date: dayjs().toDate()
      }

      await createRentalUseCase.execute(payload)
      await createRentalUseCase.execute({ ...payload, user_id: '234' })
    }).rejects.toBeInstanceOf(AppError)
  })
})