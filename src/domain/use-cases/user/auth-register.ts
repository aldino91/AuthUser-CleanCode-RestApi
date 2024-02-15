import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { UserRepository } from '../../repositories/user.repository';

export interface RegisterUserUseCaseInt {
	execute(dto: RegisterUserDto): Promise<any>;
}

export class RegisterUserUseCase implements RegisterUserUseCaseInt {
	constructor(private readonly repository: UserRepository) {}
	async execute(dto: RegisterUserDto): Promise<any> {
		return await this.repository.register(dto);
	}
}
