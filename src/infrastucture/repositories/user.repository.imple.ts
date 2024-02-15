import {
	LoginUserDto,
	UserDataReturn,
	UserDataSources,
	UserEntity,
	UserRepository,
} from '../../domain';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';

export class UserRepositoryImpl implements UserRepository {
	constructor(private readonly datasources: UserDataSources) {}

	async register(registerUserDto: RegisterUserDto): Promise<any> {
		return await this.datasources.register(registerUserDto);
	}

	async login(loginUserDto: LoginUserDto): Promise<any> {
		return await this.datasources.login(loginUserDto);
	}

	validateEmail(): Promise<UserEntity> {
		throw new Error('Method not implemented.');
	}
}
