import prisma from "../../src/database";
import { UserInput } from "../../src/repository";
import { faker } from '@faker-js/faker';


export async function buildUser() {
  return await prisma.user.create({
    data: {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  })
}