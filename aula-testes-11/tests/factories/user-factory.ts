import prisma from "database"

export async function createUser(email: string, password: string) {
  return prisma.user.create({
    data: {
      email: email,
      password: password
    }
  })
}