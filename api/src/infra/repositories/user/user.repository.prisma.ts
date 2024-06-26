import { PrismaClient } from "@prisma/client";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { User } from "../../../domain/user/entity/user";
import { IUser } from "../../../domain/interfaces/user";

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prisma: PrismaClient) { }

    public static create(prisma: PrismaClient) {
        return new UserRepositoryPrisma(prisma);
    }

    public async save(user: User): Promise<void> {
        const { name, email, phone, password } = user;
        await this.prisma.users.create({ data: { name, email, phone, password } });
    }

    public async getById(id: number): Promise<User> {
        const user = await this.prisma.users.findUnique({ where: { id } });
        if(user) return User.with(user);

        return User.with({} as IUser); //USER NOT FOUND
    }

    public async getByEmail(email: string): Promise<User> {
        const user = await this.prisma.users.findUnique({ where: { email } });
        if(user) return User.with(user);

        return User.with({} as IUser); //USER NOT FOUND
    }
}