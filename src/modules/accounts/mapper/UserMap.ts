import { User } from "../infra/typeorm/entities/User";
import { instanceToInstance } from 'class-transformer'

class UserMap {
  static toDTO({
    email,
    name,
    avatar,
    id,
    driver_license,
    avatar_url
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      avatar,
      id,
      driver_license,
      avatar_url
    })
    return user;
  }
}

export { UserMap }