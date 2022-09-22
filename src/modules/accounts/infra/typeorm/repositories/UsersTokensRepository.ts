import { Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import dataSource from "@shared/infra/typeorm/data-source";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {

  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = dataSource.getRepository(UserTokens);
  }

  async create({
    user_id,
    refresh_token,
    expires_date
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      user_id,
      refresh_token
    })

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens> {
    return this.repository.findOne({
      where: {
        user_id,
        refresh_token: token
      }
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByRefreshToken(token: string): Promise<UserTokens> {
    return this.repository.findOne({
      where: {
        refresh_token: token
      }
    })
  }
}

export { UsersTokensRepository }