import { Repository } from "typeorm";
import dataSource from "../../../../database/data-source";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(User);
  }
  async findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }
  async findById(id: string): Promise<User> {
    return this.repository.findOneBy({ id })
  }

  async create({ name, email, driver_license, password, avatar, id }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id
    })

    await this.repository.save(user);
  }

}

export { UsersRepository }