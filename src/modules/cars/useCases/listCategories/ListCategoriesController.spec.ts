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

  it("should be able to list all categories", async () => {

    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin"
    })

    const { token } = responseToken.body

    await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Category description supertest"
      }).set({
        Authorization: `Bearer ${token}`
      })

    const response = await request(app).get("/categories")

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id")
    expect(response.body[0].name).toBe("Category supertest")
  })
}) 