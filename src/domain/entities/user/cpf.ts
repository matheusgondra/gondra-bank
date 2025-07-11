import { DomainError } from "../../errors/domain-error";

export class CPF {
	private readonly value: string;

	constructor(cpf: string) {
		this.validate(cpf);

		this.value = cpf;
	}

	getValue(): string {
		return this.value;
	}

	private validate(cpf: string): void {
		const cpfWithoutFormatting = this.clearFormatting(cpf);

		const isValidLength = cpfWithoutFormatting.length === 11;
		if (!isValidLength) {
			throw new DomainError("Invalid CPF");
		}

		const isValidSequence = !/^(\d)\1{10}$/.test(cpfWithoutFormatting);
		if (!isValidSequence) {
			throw new DomainError("Invalid CPF");
		}
	}

	private clearFormatting(cpf: string): string {
		return cpf.replaceAll(".", "").replaceAll("-", "");
	}
}
