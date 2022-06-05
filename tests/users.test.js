const request = require("supertest");
const app = require("../main.js");

describe("testing/users", () => {
  const user = {
    name: "Username",
    email: "test@example.com",
    password: "123456",
    role: "user",
    confirmed: false,
  };

  test("Create a user", async () => {
    const res = await request(app)
      .post("/users")
      .send(user)
      .expect(201);

    const sendUser = {
      ...user,
      id: res.body.user.id,
      createdAt: res.body.user.createdAt,
      updatedAt: res.body.user.updatedAt,
    };
    const newUser = res.body.user;
    expect(newUser).toEqual(sendUser);
  });
});
