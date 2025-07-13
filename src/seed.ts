import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PrismaClient } from "../generated/prisma";
import { BirthDate } from "./domain/entities/user/birth-date";
import { CPF } from "./domain/entities/user/cpf";
import { Email } from "./domain/entities/user/email";
import { PasswordHash } from "./domain/entities/user/password-hash";
import { User } from "./domain/entities/user/user";

interface UserMock {
	id: string;
	name: string;
	email: string;
	cpf: string;
	birthDate: string;
}

interface DataMock {
	users: UserMock[];
}

const db = new PrismaClient();

async function seed() {
	const file = await readFile(join(__dirname, "..", "users-mock.json"), "utf-8");
	const data: DataMock = JSON.parse(file);

	const users: User[] = data.users.map((user) => {
		const email = new Email(user.email);
		const password = new PasswordHash("StrongPassword@123");
		const birthDate = new BirthDate(user.birthDate);
		const cpf = new CPF(user.cpf);

		return new User(parseInt(user.id), user.name, email, password, cpf, birthDate);
	});

	const prismaUsers = users.map((user) => ({
		id: user.getId(),
		name: user.getName(),
		email: user.getEmail().getValue(),
		password: user.getPassword().getValue(),
		cpf: user.getCPF().getValue(),
		birthDate: user.getBirthDate().getValue().toISOString()
	}));

	await db.user.createMany({
		data: prismaUsers,
		skipDuplicates: true
	});

	let accountNumber = 1;

	for (const user of users) {
		await db.account.upsert({
			where: {
				number: accountNumber
			},
			create: {
				number: accountNumber,
				agency: 1,
				holderId: user.getId(),
				balance: 0,
				type: "CHECKING"
			},
			update: {}
		});

		accountNumber++;

		await db.account.upsert({
			where: {
				number: accountNumber
			},
			create: {
				number: accountNumber,
				agency: 1,
				holderId: user.getId(),
				balance: 0,
				type: "INVESTMENT"
			},
			update: {}
		});

		accountNumber++;
	}

	console.log(`Seeded ${users.length} users and created accounts for them.`);
}

seed()
	.then(() => {
		console.log("Seeding completed successfully.");
		return db.$disconnect();
	})
	.catch((error) => {
		console.error("Error during seeding:", error);
		return db.$disconnect();
	});
