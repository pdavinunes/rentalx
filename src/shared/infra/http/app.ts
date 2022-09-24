import "reflect-metadata"
import "dotenv/config"

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import { router } from './routes';
import swaggerFile from '../../../swagger.json'

import { createConnection } from '@shared/infra/typeorm/data-source';

createConnection();

import "@shared/container"
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";
import rateLimiter from "./middlewares/rateLimiter";

const app = express();

app.use(rateLimiter);

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

app.use(cors());
app.use(router);

app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  })
})

export { app }
