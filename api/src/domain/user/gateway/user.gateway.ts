import { User } from "../entity/user";

export interface UserGateway {
    save: (user: User) => Promise<void>,
    // update: (user: User) => Promise<void>,
    getById: (id: number) => Promise<User>,
    getByEmail: (email: string) => Promise<User>
}