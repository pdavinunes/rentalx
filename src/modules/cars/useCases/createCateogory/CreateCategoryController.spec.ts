import { app } from "@shared/infra/http/app";
import request from "supertest";
import { hash } from "bcryptjs";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { createConnection } from "@shared/infra/typeorm/data-source";

let connection: DataSource;
let id: string;

describe("Create Category Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash('admin', 8);

    id = uuidV4();

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      VALUES('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'XXXXX')
    `
    )
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  })

  it("should be able to create a new category", async () => {

    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin"
    })

    const { refresh_token } = responseToken.body

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Category description supertest"
      }).set({
        Authorization: `Bearer ${refresh_token}`
      })

    expect(response.status).toBe(201);
  })
  it("should not be able to create a new category with name exists", async () => {

    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin"
    })

    const { refresh_token } = responseToken.body

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Category description supertest"
      }).set({
        Authorization: `Bearer ${refresh_token}`
      })

    expect(response.status).toBe(400);
  })
}) 