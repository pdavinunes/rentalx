import { NextFunction, Request, Response } from "express"
import { verify } from 'jsonwebtoken'
import { AppError } from "@shared/errors/AppError";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";


interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, _respnse: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ")
  try {
    const { sub: user_id } = verify(token, "9e96df6a420284b7e50d139c92db6c46") as IPayload;

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)
    if (!user) {
      throw new AppError("User does not exists!", 401)
    }

    request.user = {
      id: user_id
    }

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}