import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { UserEntity } from '../entity/user.entity';

export interface UserDataReturn {
	id: string;
	name: string;
	email: string;
	emailValidated: boolean;
	role: string;
	img?: string;
}

export abstract class UserDataSources {
	abstract register(registerUserDto: RegisterUserDto): Promise<any>;

	abstract login(loginUserDto: LoginUserDto): Promise<any>;

	abstract validateEmail(): Promise<any>;
}
