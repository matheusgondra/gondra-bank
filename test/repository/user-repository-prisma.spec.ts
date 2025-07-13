import type { PrismaClient } from "generated/prisma";
import { User } from "@/domain/entities/user/user";
import { UserRepositoryPrisma } from "@/repository/user-repository-prisma";

interface SutType {
	sut: UserRepositoryPrisma;
	dbStub: PrismaClient;
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
			findFirst: jest.fn().mockResolvedValue(userMock),
			findUnique: jest.fn().mockResolvedValue(userMock)
		}
	} as unknown as PrismaClient;
};

const makeSut = (): SutType => {
	const dbStub = makeDbStub();
	const sut = new UserRepositoryPrisma(dbStub);

	return {
		sut,
		dbStub
	};
};

describe("UserRepositoryPrisma", () => {
	describe("loadByEmailOrCpf", () => {
		const email = "any@mail.com";
		const cpf = "12345678901";

		it("Should return a user when found by email or CPF", async () => {
			const { sut } = makeSut();

			const user = await sut.loadByEmailOrCpf(email, cpf);

			expect(user).toBeDefined();
			expect(user).toBeInstanceOf(User);
		});

		it("Should return null when no user is found", async () => {
			const { sut, dbStub } = makeSut();
			jest.spyOn(dbStub.user, "findFirst").mockResolvedValueOnce(null);

			const user = await sut.loadByEmailOrCpf(email, cpf);

			expect(user).toBeNull();
		});
	});

	describe("loadById", () => {
		it("Should return a user when found by ID", async () => {
			const { sut } = makeSut();

			const user = await sut.loadById(userMock.id);

			expect(user).toBeDefined();
			expect(user).toBeInstanceOf(User);
		});

		it("Should return null when no user is found by ID", async () => {
			const { sut, dbStub } = makeSut();
			jest.spyOn(dbStub.user, "findUnique").mockResolvedValueOnce(null);

			const user = await sut.loadById(999);

			expect(user).toBeNull();
		});
	});
});
