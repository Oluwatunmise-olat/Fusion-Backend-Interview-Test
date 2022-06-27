import supertest from "supertest";
import faker from "@withshepherd/faker";
import app from "../../src/app";
import { IResponse } from "../../src/types/index";
import { DBSource } from "../../src/db/data-source";
import { Currency } from "../../src/db/entities";
import { createUser } from "../helpers";

let setup: {
  baseUrl?: string;
  userPayload?: { access_token: string };
  currencyPayload?: { name: string; code: string; symbol: string };
  invalidCurrencyPayload?: { code: string; symbol: string };
  validCurrencyId?: number;
  invalidId?: number;
  accessToken?: string;
} = {};

const baseUrl = "/api/currency";
const invalidId = Math.ceil(Math.random() * 100);
const currencyPayload = {
  name: faker.finance.currencyName(),
  code: faker.finance.currencyCode(),
  symbol: faker.finance.currencySymbol(),
};
const invalidCurrencyPayload = {
  code: faker.finance.currencyCode(),
  symbol: faker.finance.currencySymbol(),
};

setup = { baseUrl, invalidId, currencyPayload, invalidCurrencyPayload };

beforeAll(async () => {
  const accessToken = await createUser({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.unique(faker.internet.email),
  });
  setup.accessToken = accessToken;
});

describe(`GET ${setup.baseUrl}`, () => {
  test("on startup, default currency 'naira' should exists", async () => {
    const response = await supertest(app).get(`${baseUrl}`);
    const resBody: IResponse = response.body;

    expect(resBody.success).toBeTruthy();
    expect(resBody.data.count).toBeGreaterThan(0);

    const defaultCurrencyNairaExists = await DBSource.getRepository(Currency).findOne({ where: { name: "naira" } });
    expect(!!defaultCurrencyNairaExists).toBeTruthy();
  });
});

describe(`POST ${setup.baseUrl}/create`, () => {
  test("given invalid payload, should have error", async () => {
    const response = await supertest(app)
      .post(`${setup.baseUrl}/create`)
      .send(setup.invalidCurrencyPayload)
      .set("Authorization", `Bearer ${setup.accessToken}`);
    const resBody: IResponse = response.body;

    expect(response.statusCode).toEqual(400);
    expect(resBody.success).toBeFalsy();
  });

  test("given valid payload, should not have error", async () => {
    const response = await supertest(app)
      .post(`${setup.baseUrl}/create`)
      .send(setup.currencyPayload)
      .set("Authorization", `Bearer ${setup.accessToken}`);
    const resBody: IResponse = response.body;

    expect(response.statusCode).toEqual(201);
    expect(resBody.success).toBeTruthy();
  });
});

describe(`GET ${setup.baseUrl}/:currencyId`, () => {
  beforeAll(async () => {
    setup.validCurrencyId = (await DBSource.getRepository(Currency).find({}))[0].id;
  });

  test("given invalid currency id, should have error", async () => {
    const response = await supertest(app).get(`${baseUrl}/${invalidId}`);
    const resBody: IResponse = response.body;

    expect(resBody.success).toBeFalsy();
    expect(response.statusCode).toEqual(404);
  });

  test("given valid currency id, should not have error", async () => {
    const response = await supertest(app).get(`${baseUrl}/${setup.validCurrencyId}`);
    const resBody: IResponse = response.body;

    expect(resBody.success).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(resBody.data.id).toEqual(setup.validCurrencyId);
  });
});
