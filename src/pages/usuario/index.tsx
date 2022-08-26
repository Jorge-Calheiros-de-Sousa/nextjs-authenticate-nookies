import { User } from "../../@types/user";
import Main from "../../components/main";
import Default from "../../layout/default";
import styles from "../../styles/Home.module.css";
import ProfileService from "../../services/ProfileService";
import Text from "../../components/text";
import NavLink from "../../components/navlink";
import Button from "../../components/button";
import nookies from "nookies";
import { useEffect, useState } from "react";

type Props = {
    data: User
}

export default function Usuario({ data }: Props) {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(false);
    const [messageUser, setMessageUser] = useState('Carregando...');

    useEffect(() => {
        setUser(data);
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

    return (
        <Default titlePage={user ? user.name : 'Usuário'} className={styles.container} isLoading={loading} messageLoading={messageUser}>
            <Main className="h-screen flex justify-center items-center">
                {user &&
                    <div className="bg-white rounded p-10 flex flex-col justify-between h-fit w-1/2">
                        <div className="flex justify-between mb-10">
                            <Button onClick={handleLogOut} className="shadow mr-5 bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer">
                                Sair na conta
                            </Button>
                            {user.isAdmin ?
                                <NavLink route="/admin" className="shadow mr-5 bg-slate-500 hover:bg-slate-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer">
                                    Admin
                                </NavLink>
                                :
                                ''
                            }
                        </div>
                        <h1 className="text-3xl underline">{user.name}</h1>
                        <Text className="text-1xl mt-5">
                            <strong>E-mail:</strong> {user.email}
                        </Text>
                        <Text className="text-1xl mt-5">
                            <strong>Telefone:</strong> {user.phone}
                        </Text>
                        <Text className="text-1xl mt-5">
                            <strong>Descriçao: </strong>
                            {user.description}
                        </Text>
                        <Text className="text-1xl mt-5">
                            <strong>Linkendin:</strong> {user.linkedin}
                        </Text>
                        <Text className="text-1xl mt-5">
                            <strong>GitHub:</strong> {user.github}
                        </Text>
                        <div className="flex justify-between mt-10">
                            <NavLink route="/usuario/editar" className="shadow mr-5 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer">
                                Editar
                            </NavLink>
                        </div>
                    </div>
                }
            </Main>
        </Default>
    )
}

export async function getServerSideProps(context: any) {
    const token = nookies.get(context).TOKEN_USER;
    const [data, error] = await ProfileService.get(token);
    if (!error) {
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