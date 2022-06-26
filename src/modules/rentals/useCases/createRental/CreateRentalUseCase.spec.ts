import dayjs from "dayjs"

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
describe("Create Rental", () => {

  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
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