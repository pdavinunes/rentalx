import { Repository } from "typeorm";
import dataSource from "../../../../database/data-source";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(User);
  }
  async findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }

  async create({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password
    })

    await this.repository.save(user);
  }

}

export { UsersRepository }