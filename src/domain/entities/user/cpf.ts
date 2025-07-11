import { DomainError } from "../../errors/domain-error";

export class CPF {
	private readonly value: string;

	constructor(cpf: string) {
		this.validate(cpf);

		this.value = cpf;
	}

	private validate(cpf: string): void {
		const isValidLength = cpf.length === 11;
		if (!isValidLength) {
			throw new DomainError("Invalid CPF");
		}

		const isValidSequence = !/^(\d)\1{10}$/.test(cpf);
		if (!isValidSequence) {
			throw new DomainError("Invalid CPF");
		}
	}
}
