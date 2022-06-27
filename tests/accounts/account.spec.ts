import supertest from "supertest";
import app from "../../src/app";
import { IResponse } from "../../src/types/index";

let setup: { baseUrl?: string } = {};

const baseUrl = "/api/accounts";
setup = { baseUrl };

describe(`GET ${setup.baseUrl}`, () => {
  test("get all user accounts", async () => {
    const response = await supertest(app).get(setup.baseUrl!);
    const resBody: IResponse = response.body;

    expect(response.statusCode).toEqual(200);
    expect(resBody.success).toBeTruthy();
    expect(resBody.data.count).toEqual(0);
  });
});
