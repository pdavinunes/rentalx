import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe('Create car', () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'name car',
      description: 'description',
      daily_rate: 100,
      license_plate: 'FD0C910',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty("id")
  })

  it('should not be able to create a car with exits license plate', async () => {
    expect(async () => {
      const car = {
        name: 'name car',
        description: 'description',
        daily_rate: 100,
        license_plate: 'FD0C910',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category',
      }

      await createCarUseCase.execute(car);
      await createCarUseCase.execute({ name: 'name car 2', ...car });
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a car with avaiable true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'name car',
      description: 'description',
      daily_rate: 100,
      license_plate: 'ABCC910',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    expect(car.avaiable).toBe(true)
  })
})