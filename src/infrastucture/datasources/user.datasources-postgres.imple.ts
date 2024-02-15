import { BcryptAdapter, JwtAdapter } from '../../config';
import { prisma } from '../../data';
import {
	CustomError,
	LoginUserDto,
	UserDataReturn,
	UserDataSources,
	UserEntity,
} from '../../domain';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';

export class UserDatasourcePostImple implements UserDataSources {
	async register(registerUserDto: RegisterUserDto): Promise<any> {
		const existeUser = await prisma.user.findFirst({
			where: {
				email: registerUserDto.email,
			},
		});

		if (existeUser) throw CustomError.badRequest('Email already axist');

		try {
			const passwordHash = BcryptAdapter.hash(registerUserDto.password);
			const user = await prisma.user.create({
				data: {
					name: registerUserDto.name,
					email: registerUserDto.email,
					password: passwordHash,
					img: 'TEST',
					role: 'USER-ROLE',
				},
			});

			// const { password, ...userEntity } = UserEntity.fromObject(user);

			return user;
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}
	async login(loginUserDto: LoginUserDto): Promise<any> {
		const user = await prisma.user.findFirst({
			where: {
				email: loginUserDto.email,
			},
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

		console.log('siamo nel login postgres');

		return {
			user: { userEntity },
			token,
		};
	}
	validateEmail(): Promise<UserDataReturn> {
		throw new Error('Method not implemented.');
	}
}
