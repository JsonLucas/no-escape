import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthContext {
    isAuthenticated: boolean,
    setIsAuthenticated: (param: boolean) => void
}

type Props = {
    children: ReactNode
}

const AuthContext = createContext({} as IAuthContext);
export const useAuth = () => useContext(AuthContext);

export function AuthContextComponent ({ children }: Props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}