import jwt from 'jsonwebtoken';
import { envs } from './envs';

const seed = envs.JWT_SEED;

export class JwtAdapter {
	static generateToken(payload: any, duration: string = '2h') {
		return new Promise((resolve) => {
			jwt.sign(payload, seed, { expiresIn: duration }, (err, token) => {
				if (err) return resolve(null);

				return resolve(token);
			});
		});
	}

	static validateToken(token: string) {}
}
