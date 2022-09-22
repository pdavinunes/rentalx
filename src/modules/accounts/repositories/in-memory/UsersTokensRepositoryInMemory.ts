import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {

  usersTokens: UserTokens[] = [];

  async create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date,
    })

    this.usersTokens.push(userToken)

    return userToken;
  }
  async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      user => user.user_id === user_id && user.refresh_token === token
    );
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.id === id)
    this.usersTokens.splice(this.usersTokens.indexOf(userToken))
  }
  async findByRefreshToken(token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      user => user.refresh_token === token
    );
  }

}

export { UsersTokensRepositoryInMemory }