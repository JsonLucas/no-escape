export interface IUser {
    name: string,
    email: string,
    phone: string,
    password: string,
    picture?: string
}

export type Login = Pick<IUser, 'email' | 'password'>;
export type SignUp = Omit<IUser, 'picture'>;