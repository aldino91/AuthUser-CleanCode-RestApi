import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthServices } from '../services.ts/auth.services';
import { CustomError, LoginUserDto } from '../../domain';

export class AuthController {
	constructor(public readonly authService: AuthServices) {}

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

		this.authService
			.registerUser(registerDto!)
			.then((user) => res.json(user))
			.catch((error) => this.handlerError(error, res));
	};

	login = (req: Request, res: Response) => {
		const [error, loginUserDto] = LoginUserDto.create(req.body);

		if (error) return res.status(400).json({ error });

		this.authService
			.loginUser(loginUserDto!)
			.then((user) => res.json(user))
			.catch((error) => this.handlerError(error, res));
	};

	validateEmail = (req: Request, res: Response) => {
		res.json('validateEmailUser');
	};
}
