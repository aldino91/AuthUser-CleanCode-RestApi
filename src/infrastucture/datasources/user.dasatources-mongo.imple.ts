import { BcryptAdapter, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import {
	CustomError,
	LoginUserDto,
	UserDataReturn,
	UserDataSources,
	UserEntity,
} from '../../domain';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';

const dataTest = {
	id: 'kjadnew787we',
	name: 'luca',
	email: 'luca@gmail.com',
	emailValidated: false,
	role: 'admin',
	img: 'jksnfdksjdnfcjkdsn',
};

export class UserDatasourceMongoImple implements UserDataSources {
	async register(registerUserDto: RegisterUserDto): Promise<any> {
		const existeUser = await UserModel.findOne({
			email: registerUserDto.email,
		});
		if (existeUser) throw CustomError.badRequest('Email already axist');

		try {
			const user = new UserModel(registerUserDto);

			user.password = BcryptAdapter.hash(registerUserDto.password);

			await user.save();

			const { password, ...userEntity } = UserEntity.fromObject(user);

			return {
				user: userEntity,
				token: 'ABC',
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}

	async login(loginUserDto: LoginUserDto): Promise<any> {
		const user = await UserModel.findOne({
			email: loginUserDto.email,
		});
		if (!user) throw CustomError.badRequest('Email or Passowrd not exist');

		const isMatching = BcryptAdapter.compare(
			loginUserDto.password,
			user.password
		);

		if (!isMatching)
			throw CustomError.badRequest('Password or Email not valid');

		const { password, ...userEntity } = UserEntity.fromObject(user);

		const token = await JwtAdapter.generateToken({
			id: user.id,
			email: user.email,
		});

		if (!token) throw CustomError.internalServer('Error while creating JWT');

		return {
			user: { userEntity },
			token,
		};
	}

	validateEmail(): Promise<UserEntity> {
		throw new Error('Method not implemented.');
	}
}
