import { createContext, ReactNode, useContext, useState } from "react";
import { IUser } from "../interfaces/User";

type Profile = Omit<IUser, 'password'>;

interface ProfileContext {
    profile: Profile,
    setProfile: (body: Profile) => void
}

interface Props {
    children: ReactNode
}

const UserProfileContext = createContext({  } as ProfileContext);
export const useUserProfileContext = () => useContext(UserProfileContext);

export function UserProfileContextComponent ({ children }: Props) {
    const [profile, setProfile] = useState({} as Profile);
    return (
        <UserProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </UserProfileContext.Provider>
    );
}