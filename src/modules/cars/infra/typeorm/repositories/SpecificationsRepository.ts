import { In, Repository } from 'typeorm';
import dataSource from '@shared/infra/typeorm/data-source';
import { Specification } from '../entities/Specification';
import { ICreateSpecificationDTO, ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';


class SpecificationsRepository implements ISpecificationRepository {

  private repository: Repository<Specification>

  constructor() {
    this.repository = dataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description
    })

    return this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOneBy({ name })
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findBy({ id: In(ids) });
  }
}

export { SpecificationsRepository };
