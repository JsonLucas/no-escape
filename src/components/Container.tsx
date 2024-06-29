import { ReactNode } from "react";

interface Props {
    classList?: Array<string>,
    children: ReactNode
}

export function Container({ classList, children }: Props) {
    return (
        <main className={`default ${classList?.join(" ")}` ?? "flex center"}>
            {children}
        </main>
    );
}