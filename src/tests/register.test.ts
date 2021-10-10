import { startServer } from "./../startServer";
import { User } from "./../entity/User";
import { request } from "graphql-request";

jest.setTimeout(10000);

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  getHost = () => `http://localhost:${app.address().port}`;
});

test("Register user", async () => {
  const email = "fake2@gmail.com";
  const password = "123456";

  const mutation = `
        mutation {
            register(email:"${email}", password:"${password}")
        }
    `;

  const result = await request(getHost(), mutation);
  expect(result).toEqual({ register: true });
  const users = await User.find({ where: { email } });

  expect(users).toHaveLength(1);
  expect(users[0].email).toEqual(email);
  expect(users[0].password).not.toBe(password);
});
