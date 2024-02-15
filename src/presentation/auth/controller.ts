import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthServices } from '../services.ts/auth.services';
import { CustomError, LoginUserDto, UserRepository } from '../../domain';
import { Request, Response } from 'express';
import { UserRepositoryImpl } from '../../infrastucture/repositories/user.repository.imple';
import { LoginUserUseCase } from '../../domain/use-cases/user/auth-login';
import { RegisterUserUseCase } from '../../domain/use-cases/user/auth-register';

export class AuthController {
	constructor(public readonly userRepository: UserRepository) {}

	private handlerError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message });
		}

		console.log(`${error}`);
		return res.status(500).json({ error: 'Internal server error' });
	};

	register = (req: Request, res: Response) => {
		const [error, registerDto] = RegisterUserDto.create(req.body);

		if (error) res.status(400).json({ error });

		// this.userRepository.register(registerDto!);

		new RegisterUserUseCase(this.userRepository)
			.execute(registerDto!)
			.then((todos) => res.json(todos))
			.catch((error) => res.status(400).json({ error }));
	};

	login = (req: Request, res: Response) => {
		const [error, loginUserDto] = LoginUserDto.create(req.body);

		if (error) return res.status(400).json({ error });

		// this.userRepository.login(loginUserDto!);

		new LoginUserUseCase(this.userRepository)
			.execute(loginUserDto!)
			.then((user) => res.json(user))
			.catch((error) => res.status(400).json({ error }));
	};

	validateEmail = (req: Request, res: Response) => {
		res.json('validateEmailUser');
	};
}
