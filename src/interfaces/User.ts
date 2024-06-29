export interface IUser {
    id: number,
    name: string,
    email: string,
    phone: string,
    password: string,
    picture?: string
}

export type Login = Pick<IUser, 'email' | 'password'>;
export type SignUp = Omit<IUser, 'id' | 'picture'>;
export type Profile = Omit<IUser, 'id' | 'password' | 'picture'>;