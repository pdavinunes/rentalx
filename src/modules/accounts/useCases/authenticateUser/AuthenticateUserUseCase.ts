import { compare } from 'bcryptjs'
import { inject, injectable } from "tsyringe";
import { sign } from 'jsonwebtoken'

import { IUsersRepository } from "../../repositories/IUsersRepository";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    const token = sign({}, "9e96df6a420284b7e50d139c92db6c46", {
      subject: user.id,
      expiresIn: "1d"
    });

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }
  }

}

export { AuthenticateUserUseCase }