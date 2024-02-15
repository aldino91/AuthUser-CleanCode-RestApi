import { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { UserEntity } from '../../entity/user.entity';
import { UserRepository } from '../../repositories/user.repository';

export interface LoginUserUseCase {
	execute(dto: LoginUserDto): Promise<any>;
}

export class LoginUserUseCase implements LoginUserUseCase {
	constructor(private readonly repository: UserRepository) {}
	async execute(dto: LoginUserDto): Promise<any> {
		return await this.repository.login(dto);
	}
}
