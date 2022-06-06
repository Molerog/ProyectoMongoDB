const User = require("../models/User");
const app = require("../index");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { dbConnection } = require("../config/config");
const req = require("express/lib/request");
const JWT_SECRET = process.env.JWT_SECRET;

describe("testing/users", () => {
    beforeAll(async()=>dbConnection())
  afterAll(() => {
    return User.deleteOne({name: 'Username'});
  });

  const user = {
    name: "Username",
    email: "test@example.com",
    password: bcrypt.hashSync('123456', 10),
    role: "user",
    confirmed: true,
    postIds:[],
    wishList:[],
    followers:[],
    tokens:[]
  };
  let token;
  test("Create a user", async () => {
    let usersCount = await User.count();
    expect(usersCount).toBe(0);

    const res = await request(app).post("/users").send(user).expect(201);
    usersCount = await User.count();
    expect(usersCount).toBe(1);

    expect(res.body.user._id).toBeDefined();
    expect(res.body.user.createdAt).toBeDefined();
    expect(res.body.user.updatedAt).toBeDefined();
    //esto ya no se envía
    const sendUser = {
      ...user,
      password: res.body.user.password,
      _id: res.body.user._id,
      __v: res.body.user.__v, //version cada vez que actualizas el documento
      createdAt: res.body.user.createdAt,
      updatedAt: res.body.user.updatedAt,
    };
    const newUser = res.body.user;
    expect(res.body.message).toEqual(
      "We have sent you an email to confirm your register..."
    );
    expect(newUser).toEqual(sendUser);
  });
//   test("Confirm a user", async () => {
//     const emailToken = jwt.sign({ email: user.email }, jwt_secret, {
//       expiresIn: "48h",
//     });
//     const res = await request(app)
//       .get("/users/confirm/" + emailToken)
//       .expect(201);
//     expect(res.text).toBe("Usuario confirmado con éxito");
//   });
//   test("Login a user", async () => {
//     const res = await request(app)
//       .post("/users/login")
//       .send({ email: "test@example.com", password: "123456" })
//       .expect(200);
//       expect(res.body.token).toBeDefined();
//     token = res.body.token;
//   });
//   test("Get users", async () => {
//     const res = await request(app)
//       .get("/users")
//       .expect(200)
//       .set({ Authorization: token });
//     expect(res.body).toBeInstanceOf(Array);
//   });
//   test("Update a user record", async () => {
//     const updateUser = { name: "Updated name" };
//     const res = await request(app)
//       .put("/users/id/1")
//       .send(updateUser)
//       .set({ Authorization: token })
//       .expect(200);
//     expect(res.text).toBe("Usuario actualizado con éxito");
//   });
//   test("Logout a user record", async () => {
//     const res = await request(app)
//       .delete("/users/logout")
//       .set({ Authorization: token })
//       .expect(200);
//     expect(res.body.message).toBe("Desconectado con éxito");
//   });
});
