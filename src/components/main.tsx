import { HTMLAttributes } from "react"

type Props = HTMLAttributes<any> & {
    children: any
}

export default function Main({ children, ...rest }: Props) {
    return (
        <main {...rest}>
            {children}
        </main>
    )
}