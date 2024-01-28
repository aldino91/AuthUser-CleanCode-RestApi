import { BcryptAdapter, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto, UserEntity } from '../../domain';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';

export class AuthServices {
	constructor() {}

	public async registerUser(registerUserDto: RegisterUserDto) {
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

	public async loginUser(loginUserDto: LoginUserDto) {
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
}
