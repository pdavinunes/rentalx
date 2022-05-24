import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from '../ISpecificationRepository';

class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }
    return SpecificationsRepository.INSTANCE;
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    return this.specifications.find(
      specificationItem => specificationItem.name === name
    );
  }
}

export { SpecificationsRepository };
