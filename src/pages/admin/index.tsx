import { useEffect, useState } from "react"
import Main from "../../components/main";
import Default from "../../layout/default"
import nookies from "nookies"
import ProfileService from "../../services/ProfileService";
import { User } from "../../@types/user";
import Button from "../../components/button";
import NavLink from "../../components/navlink";
import AdminService from "../../services/AdminService";

type Props = {
    data: User
    registers: User[]
}

type PropsDetails = {
    user: User
    resetDetails: () => void
}

type PropsHeader = {
    name: string
    handleLogOut: () => void
}

type PropsTr = {
    user: User
    showDetails: (user: User) => void
}

export function Tr({ user, showDetails }: PropsTr) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {user.name}
            </th>
            <td className="px-6 py-4">
                {user.email}
            </td>
            <td className="px-6 py-4">
                {user.phone}
            </td>
            <td className="px-6 py-4">
                {user.isAdmin ? 'Yes' : 'No'}
            </td>
            <td className="px-6 py-4 text-right">
                <Button className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" onClick={() => { showDetails(user) }}>
                    Detalhes
                </Button>
            </td>
        </tr>
    )
}

export function Header({ name, handleLogOut }: PropsHeader) {

    return (
        <header className="bg-white w-full h-28 flex justify-between items-center px-10 ">

            <NavLink route="/usuario">
                <h1 className="text-3xl underline cursor-pointer">{name}</h1>
            </NavLink>
            <Button onClick={handleLogOut} className="shadow mr-5 bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer">
                Sair na conta
            </Button>
        </header>
    )
}

export function Details({ user, resetDetails }: PropsDetails) {
    return (
        <div>
            <div className="flex justify-end mb-5 items-center">

                <Button onClick={resetDetails} className={"font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"}>
                    Voltar
                </Button>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="col" className="px-6 py-3">
                            Nome do usuário
                        </th>
                        <td className="px-6 py-4">
                            {user.name}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="col" className="px-6 py-3">
                            E-mail
                        </th>
                        <td className="px-6 py-4">
                            {user.email}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="col" className="px-6 py-3">
                            Telefone
                        </th>
                        <td className="px-6 py-4">
                            {user.phone}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="col" className="px-6 py-3">
                            Descrição
                        </th>
                        <td className="px-6 py-4">
                            {user.description}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="col" className="px-6 py-3">
                            Linkedin
                        </th>
                        <td className="px-6 py-4">
                            {user.linkedin}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="col" className="px-6 py-3">
                            GitHub
                        </th>
                        <td className="px-6 py-4">
                            {user.github}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="col" className="px-6 py-3">
                            Admin
                        </th>
                        <td className="px-6 py-4">
                            {user.isAdmin ? 'Yes' : 'No'}
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default function Admin({ data, registers }: Props) {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [messageUser, setMessageUser] = useState('Carregando...');
    const [user, setUser] = useState<User>();
    const [showDetails, setShowDetails] = useState<User | null>();
    useEffect(() => {
        if (data) {
            setUser(data);
            setUsers(registers);
        }
    }, [])

    async function handleLogOut() {
        const secondsWait = 5000;
        setLoading(true);
        const token = nookies.get(null).TOKEN_USER;
        const [data, error] = await ProfileService.logout(token);
        if (!error) {
            setTimeout(() => { setMessageUser('Deslogado com sucesso!') }, secondsWait - 2000);
            setTimeout(() => {
                if (nookies.destroy(null, 'TOKEN_USER')) {
                    window.location.href = '/';
                }
            }, secondsWait)
        } else {
            setTimeout(() => { setMessageUser('Error!') }, secondsWait - 2000);
            setTimeout(() => { setLoading(false), setMessageUser('Carregando...') }, secondsWait)
        }

    }

    function handleShowDetails(user: User) {
        setShowDetails(user);
    }

    function handleResetDetails() {
        setShowDetails(null);
    }


    return (
        <Default titlePage="Admin" isLoading={loading} messageLoading={messageUser} className={'bg-slate-500'}>
            <Main className="h-screen">
                {user &&
                    <>
                        <Header name={user.name} handleLogOut={handleLogOut} />
                        <div className="bg-white mt-10 py-10 px-20">
                            {showDetails ?
                                <Details user={showDetails} resetDetails={handleResetDetails} />
                                :
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Nome do usuário
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                E-mail
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                phone
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Admin
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <span className="sr-only">Show</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users && users.map(user => <Tr showDetails={handleShowDetails} user={user} key={user.id} />)}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </>

                }
            </Main>
        </Default>
    )
}

export async function getServerSideProps(contenxt: any) {
    const token = nookies.get(contenxt).TOKEN_USER;
    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanet: false
            }
        }
    }
    const [data, error] = await ProfileService.get(token);
    if (!error) {
        const isAdmin = data.isAdmin;
        if (isAdmin) {
            const [registers, error] = await AdminService.allUsers(token);
            if (!error) {
                return {
                    props: {
                        data,
                        registers: registers.users.data
                    }
                }
            }
            return {
                props: {
                    data
                }
            }
        } else {
            return {
                redirect: {
                    destination: '/',
                    permanet: false
                }
            }
        }
    }
    return {
        redirect: {
            destination: '/',
            permanet: false
        }
    }
}