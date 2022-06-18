import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  })
  it("should be able to list all available cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "description",
      daily_rate: 130,
      license_plate: "XXXX",
      fine_amount: 40,
      brand: "brand",
      category_id: "4asasas"
    })

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car])
  })

  it('shoulb be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "description",
      daily_rate: 130,
      license_plate: "XXXX",
      fine_amount: 40,
      brand: "brand",
      category_id: "4asasas"
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'brand'
    });

    expect(cars).toEqual([car])
  })

  it('shoulb be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "description",
      daily_rate: 130,
      license_plate: "XXXX",
      fine_amount: 40,
      brand: "brand",
      category_id: "4asasas"
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: 'car1'
    });

    expect(cars).toEqual([car])
  })

  it('shoulb be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "description",
      daily_rate: 130,
      license_plate: "XXXX",
      fine_amount: 40,
      brand: "brand",
      category_id: "4asasas"
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '4asasas'
    });

    expect(cars).toEqual([car])
  })
}) 