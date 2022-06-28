import "reflect-metadata"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "rentalx",
  synchronize: false,
  logging: false,
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  subscribers: [],
})

export function createConnection(host = "database"): Promise<DataSource> {

  const database = process.env.NODE_ENV === 'test'
    ? "rentalx_test"
    : AppDataSource.options.database.toString();

  return AppDataSource.setOptions({
    host: process.env.NODE_ENV === 'test'
      ? "localhost"
      : host,
    database
  }).initialize();
}

export default AppDataSource