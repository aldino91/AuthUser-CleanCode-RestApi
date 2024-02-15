import { UserDataReturn } from '../datasources/user-datasources';
import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { UserEntity } from '../entity/user.entity';

export abstract class UserRepository {
	abstract register(registerUserDto: RegisterUserDto): Promise<any>;
	abstract login(loginUserDto: LoginUserDto): Promise<any>;
	abstract validateEmail(): Promise<UserDataReturn>;
}
