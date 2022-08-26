import Link from "next/link";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<any> & {
    children: any
    route: string
}

export default function NavLink({ children, route, ...rest }: Props) {
    return (
        <Link href={route}>
            <div {...rest}>
                {children}
            </div>
        </Link>
    )
}