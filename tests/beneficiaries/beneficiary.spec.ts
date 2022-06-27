import supertest from "supertest";
import faker from "@withshepherd/faker";
import app from "../../src/app";
import { IResponse } from "../../src/types/index";
import { createUser } from "../helpers";

let setup: {
  baseUrl?: string;
  accessToken?: string;
  beneficiaryPayload?: { email: string };
  invalidBeneficiaryPayload?: { email: string };
} = {};

const baseUrl = "/api/beneficiaries";
setup = { baseUrl };

beforeAll(async () => {
  const accessToken = await createUser({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: "faker@exmp.com",
  });

  await createUser({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: "fake@exmp.com",
  });

  setup.accessToken = accessToken;
  setup.invalidBeneficiaryPayload = { email: "faker@exmp.com" };
  setup.beneficiaryPayload = { email: "fake@exmp.com" };
});

describe(`POST ${setup.baseUrl}/add`, () => {
  test("cannot add self as beneficiary", async () => {
    const response = await supertest(app)
      .post(`${setup.baseUrl}/add`)
      .send(setup.invalidBeneficiaryPayload)
      .set("Authorization", `Bearer ${setup.accessToken}`);
    const resBody: IResponse = response.body;

    expect(resBody.success).toBeFalsy();
    expect(response.statusCode).toEqual(400);
  });

  test("can add other user as beneficiary", async () => {
    const response = await supertest(app)
      .post(`${setup.baseUrl}/add`)
      .send(setup.beneficiaryPayload)
      .set("Authorization", `Bearer ${setup.accessToken}`);
    const resBody: IResponse = response.body;

    expect(resBody.success).toBeTruthy();
    expect(response.statusCode).toEqual(200);
  });
});

describe(`GET ${setup.baseUrl}`, () => {
  test("returns all user beneficiaries", async () => {
    const response = await supertest(app).get(`${setup.baseUrl}`).set("Authorization", `Bearer ${setup.accessToken}`);
    const resBody: IResponse = response.body;

    expect(resBody.success).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(resBody.data.count).toBeGreaterThan(0);
  });
});

describe(`DELETE ${setup.baseUrl}/remove`, () => {
  test("can remove a beneficiary", async () => {
    const response = await supertest(app)
      .delete(`${setup.baseUrl}/remove`)
      .send(setup.beneficiaryPayload)
      .set("Authorization", `Bearer ${setup.accessToken}`);
    const resBody: IResponse = response.body;

    expect(resBody.success).toBeTruthy();
    expect(response.statusCode).toEqual(200);
  });
});
