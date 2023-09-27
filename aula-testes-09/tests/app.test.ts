import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const { status } = await api.post("/users").send({
      email: "user@user.com",
      password: "123"
    });
    expect(status).toBe(201);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    await prisma.user.create({
      data: {
        email: "user@user.com",
        password: "123"
      }
    });
    const { status } = await api.post("/users").send({
      email: "user@user.com",
      password: "123"
    });
    expect(status).toBe(409);
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const user = await prisma.user.create({
      data: {
        email: "user@user.com",
        password: "123"
      }
    });
    const { status, body } = await api.get(`/user/${user.id}`);
    expect(status).toBe(200);
    expect(body).toEqual({
      id: user.id,
      email: "user@user.com",
      password: "123"
    })
  });

  it("should return 404 when can't find a user by id", async () => {
    const user = await prisma.user.create({
      data: {
        email: "user@user.com",
        password: "123"
      }
    });
    const { status } = await api.get(`/user/${user.id + 1}`);
    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    await prisma.user.create({
      data: {
        email: "user@user.com",
        password: "123"
      }
    });
    await prisma.user.create({
      data: {
        email: "user2@user.com",
        password: "123"
      }
    });
    const { status, body } = await api.get("/users");
    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          password: expect.any(String)
        })
      ])
    );
  });
})