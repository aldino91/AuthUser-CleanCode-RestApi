import { AuthController } from './controller';
// import { AuthServices } from '../services.ts/auth.services';
import { UserDatasourcePostImple } from '../../infrastucture/datasources/user.datasources-postgres.imple';
import { UserRepositoryImpl } from '../../infrastucture/repositories/user.repository.imple';
import { Router } from 'express';
import { UserDatasourceMongoImple } from '../../infrastucture/datasources/user.dasatources-mongo.imple';

export class AuthRoutes {
	static get routes(): Router {
		const router = Router();

		const datasources = new UserDatasourceMongoImple();
		// const datasources = new UserDatasourcePostImple();

		const respository = new UserRepositoryImpl(datasources);

		// const authService = new AuthServices();

		const controller = new AuthController(respository);

		// Definir las rutas
		router.post('/login', controller.login);
		router.post('/register', controller.register);
		router.get('/validate-email/:token', controller.validateEmail);

		return router;
	}
}
