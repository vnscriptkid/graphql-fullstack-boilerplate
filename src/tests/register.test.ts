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

  const initialCreds = { email, password };

  const getMutation = (overrides?: { email?: string; password?: string }) => {
    const { email, password } = { ...initialCreds, ...overrides };

    return `
        mutation {
            register(email:"${email}", password:"${password}") {
              path
              message
            }
        }
    `;
  };

  const result = await request(getHost(), getMutation());
  expect(result).toEqual({ register: null });
  const users = await User.find({ where: { email } });

  expect(users).toHaveLength(1);
  expect(users[0].email).toEqual(email);
  expect(users[0].password).not.toBe(password);

  // Register again
  const result2 = await request(getHost(), getMutation());
  expect(result2).toEqual({
    register: [
      {
        path: "email",
        message: "already taken",
      },
    ],
  });

  // Invalid email
  const result3 = await request(
    getHost(),
    getMutation({ email: "invalid_email" })
  );
  expect(result3).toMatchInlineSnapshot(`
Object {
  "register": Array [
    Object {
      "message": "email must be a valid email",
      "path": "email",
    },
  ],
}
`);

  // Too short password
  const result4 = await request(getHost(), getMutation({ password: "123" }));
  expect(result4).toMatchInlineSnapshot(`
Object {
  "register": Array [
    Object {
      "message": "password must be at least 6 characters",
      "path": "password",
    },
  ],
}
`);

  // Too long password
  const result5 = await request(
    getHost(),
    getMutation({ password: "too_longgggggggggggggggggggggggggggg" })
  );
  expect(result5).toMatchInlineSnapshot(`
Object {
  "register": Array [
    Object {
      "message": "password must be at most 20 characters",
      "path": "password",
    },
  ],
}
`);
});
