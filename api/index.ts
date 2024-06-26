import { ApiExpress } from "./src/infra/api/express/api.express";
import { CreateUserRoute } from "./src/infra/api/express/routes/user/create-user.express.route";
import { UserRepositoryPrisma } from "./src/infra/repositories/user/user.repository.prisma";
import { prisma } from "./src/utils/prisma";
import { CreateUserUsecase } from "./src/usecases/user/create-user.usecase";
import { port } from "./src/utils/env";
import { Validator } from "./src/helpers/Validator";
import { Crypto } from "./src/helpers/Crypto";
import { UserLoginRoute } from "./src/infra/api/express/routes/user/user-login.express.route";
import { GetUserByEmailUsecase } from "./src/usecases/user/get-user-by-email.usecase";
import { CreateSessionUsecase } from "./src/usecases/session/create-session.usecase";
import { SessionRepositoryPrisma } from "./src/infra/repositories/session/session.repository.prisma";
import { GetSessionByIdUsecase } from "./src/usecases/session/get-session-by-id.usecase";
import { RemoveSessionUsecase } from "./src/usecases/session/remove-session.usecase";

(() => {
    const validator = Validator.create();
    const crypto = Crypto.create();

    const userRepository = UserRepositoryPrisma.create(prisma);
    const sessionRepository = SessionRepositoryPrisma.create(prisma);

    const createUserUsecase = CreateUserUsecase.create(userRepository);
    const getUserByEmailUsecase = GetUserByEmailUsecase.create(userRepository);

    const createSessionUsecase = CreateSessionUsecase.create(sessionRepository);
    const getSesionByIdUsecase = GetSessionByIdUsecase.create(sessionRepository);
    const removeSessionUsecase = RemoveSessionUsecase.create(sessionRepository);

    const createUserRoute = CreateUserRoute.create(createUserUsecase, createSessionUsecase, validator, crypto);
    const loginRoute = UserLoginRoute.create(getUserByEmailUsecase, createSessionUsecase, validator, crypto);

    const api = ApiExpress.create([createUserRoute, loginRoute]);
    api.start(port);
})();