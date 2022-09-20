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

    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "12343",
      brand: "brand"
    })

    const payload = {
      user_id: '123',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    }

    const rental = await createRentalUseCase.execute(payload)

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if user have a open rental", async () => {
    const car = await rentalsRepositoryInMemory.create({
      car_id: '1234',
      expected_return_date: dayAdd24Hours,
      user_id: '123'
    })

    await expect(
      createRentalUseCase.execute({
        expected_return_date: dayAdd24Hours,
        user_id: '123',
        car_id: '234'
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user"))
  })

  it("should not be able to create a new rental with the car in use", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '1234',
      expected_return_date: dayAdd24Hours,
      user_id: '123'
    })

    const payload = {
      user_id: '123',
      car_id: '1234',
      expected_return_date: dayAdd24Hours
    }

    await expect(
      createRentalUseCase.execute({ ...payload, user_id: '234' })
    ).rejects.toEqual(new AppError("Car is unavailable"))
  })

  it("should not be able to create a new rental with invalid return time", async () => {
    const payload = {
      user_id: '123',
      car_id: '123',
      expected_return_date: dayjs().toDate()
    }

    await expect(
      createRentalUseCase.execute({ ...payload, user_id: '234' })
    ).rejects.toEqual(new AppError("Invalid return time!"))
  })
})