import type { PrismaClient } from "generated/prisma";
import { UserRepositoryPrisma } from "@/repository/user-repository-prisma";

interface SutType {
	sut: UserRepositoryPrisma;
}

const userMock = {
	id: 1,
	name: "anyName",
	email: "any@mail.com",
	password: "StrongPassword@123Hashed",
	cpf: "12345678901",
	birthDate: "2000-01-01",
	createdAt: new Date(),
	updatedAt: new Date()
};

const makeDbStub = (): PrismaClient => {
	return {
		user: {
			findFirst: jest.fn().mockResolvedValue(userMock)
		}
	} as unknown as PrismaClient;
};

const makeSut = (): SutType => {
	const dbStub = makeDbStub();
	const sut = new UserRepositoryPrisma(dbStub);

	return {
		sut
	};
};

describe("UserRepositoryPrisma", () => {
	it("Should return a user when found by email or CPF", async () => {
		const { sut } = makeSut();

		const email = "any@mail.com";
		const cpf = "12345678901";

		const user = await sut.loadByEmailOrCpf(email, cpf);

		expect(user).toBeDefined();
	});
});
