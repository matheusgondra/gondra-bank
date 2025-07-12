import { BirthDate } from "@/domain/entities/user/birth-date";
import { CPF } from "@/domain/entities/user/cpf";
import { Email } from "@/domain/entities/user/email";
import { Password } from "@/domain/entities/user/password";
import { User } from "@/domain/entities/user/user";

export const makeUserMock = (): User => {
	return new User(
		1,
		"anyName",
		new Email("any@mail.com"),
		new Password("StrongPassword@123"),
		new CPF("12345678901"),
		new BirthDate("2000-01-01")
	);
};
