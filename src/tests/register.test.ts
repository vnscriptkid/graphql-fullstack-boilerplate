import { User } from "./../entity/User";
import { createConnection } from "typeorm";
import { host } from "./constants";
import { request } from "graphql-request";

jest.setTimeout(10000);

test("Register user", async () => {
  const email = "fake2@gmail.com";
  const password = "123456";

  const mutation = `
        mutation {
            register(email:"${email}", password:"${password}")
        }
    `;

  const result = await request(host, mutation);
  expect(result).toEqual({ register: true });
  await createConnection();
  const users = await User.find({ where: { email } });

  expect(users).toHaveLength(1);
  expect(users[0].email).toEqual(email);
  expect(users[0].password).not.toBe(password);
});
