import supertest from "supertest";
import faker from "@withshepherd/faker";
import app from "../../src/app";
import { IResponse } from "../../src/types/index";
import { DBSource } from "../../src/db/data-source";
import { Account } from "../../src/db/entities";

let setup: { baseUrl?: string; userPayload?: { first_name: string; last_name: string; email: string; password: string } } =
  {};

const baseUrl = "/api/users";
const userPayload = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.unique(faker.internet.email),
  password: "password",
};

setup = { baseUrl, userPayload };

describe(`POST ${setup.baseUrl}/create`, () => {
  test("should create user and user account", async () => {
    const response = await supertest(app).post(`${setup.baseUrl}/create`).send(setup.userPayload);
    const resBody: IResponse = response.body;

    expect(resBody.success).toBeTruthy();

    const userAccountCreated = await DBSource.getRepository(Account).findOne({ where: { user: { id: resBody.data.id } } });
    expect(!!userAccountCreated).toBeTruthy();
  });
});

describe(`GET ${setup.baseUrl}`, () => {
  test("user array should not be empty", async () => {
    const response = await supertest(app).get(`${setup.baseUrl}`);
    const resBody: IResponse = response.body;

    expect(resBody.success).toBeTruthy();
    expect(resBody.data.length).toBeGreaterThan(0);
  });
});

describe(`POST ${setup.baseUrl}/login`, () => {
  test("given valid payload, should return access_token", async () => {
    const response = await supertest(app).post(`${setup.baseUrl}/login`).send(setup.userPayload);
    const resBody: IResponse = response.body;

    expect(resBody.success).toBeTruthy();
    expect(resBody.data.access_token).not.toBeNull();
  });
});
