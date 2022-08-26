import nookies from "nookies";
import { useEffect, useState } from "react";
import { User } from "../../@types/user";
import Button from "../../components/button";
import Input from "../../components/input";
import Main from "../../components/main";
import NavLink from "../../components/navlink";
import TextArea from "../../components/textarea";
import Default from "../../layout/default";
import ProfileService from "../../services/ProfileService";
import styles from "../../styles/Home.module.css";

type Props = {
    data: User
}

export default function Editar({ data }: Props) {
    const [name, setName] = useState(data.name);
    const [email, setEmail] = useState(data.email);
    const [phone, setPhone] = useState(data.phone);
    const [password, setPassword] = useState(data.password);
    const [description, setDescription] = useState(data.description ? data.description : '');
    const [linkedin, setLinkedin] = useState(data.linkedin);
    const [github, setGitHub] = useState(data.github);
    const [loading, setLoading] = useState(false);
    const [messageUser, setMessageUser] = useState('Carregando...');

    async function handleSubmit() {
        setLoading(true);
        const secondsToWait = 5000;
        if (!name || !email || !phone || !password || !linkedin || !github) {
            setMessageUser('Preencha o formulário')
            setTimeout(() => { setLoading(false) }, secondsToWait)
            setMessageUser('Carregando...')
            return
        }
        const form = {
            name,
            email,
            phone,
            password,
            description,
            linkedin,
            github
        }

        const token = nookies.get(null).TOKEN_USER;
        const [updated, error] = await ProfileService.update(form, data.id, token)

        if (!error) {
            setTimeout(() => { setMessageUser('Editádo com sucesso!') }, secondsToWait - 2000)
            setTimeout(() => { setLoading(false), window.location.href = '/usuario' }, secondsToWait)
        } else {
            setTimeout(() => { setMessageUser('Error') }, secondsToWait - 2000)
            setTimeout(() => { setLoading(false), window.location.href = '/usuario' }, secondsToWait)
        }
    }

    return (
        <Default titlePage="Editar" isLoading={loading} messageLoading={messageUser} className={styles.container}>
            <Main className="h-screen flex justify-center items-center">
                <div className="bg-white rounded p-10 flex justify-between ">
                    <div>
                        <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} maxLength={50} />
                        <Input label="E-mail" value={email} type="email" onChange={(e) => setEmail(e.target.value)} maxLength={50} />
                        <Input label="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <TextArea label="Descrição" requiredInput={false} value={description ?? ''} onChange={(e) => setDescription(e.target.value)} maxLength={200} />
                        <Input label="Linkendin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} maxLength={50} />
                        <Input label="Github" value={github} onChange={(e) => setGitHub(e.target.value)} maxLength={50} />
                        <Input label="Confirme a sua senha" type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} maxLength={8} />

                        <div className="text-red-600 text-right mb-10">
                            * Campo obrigátorio
                        </div>
                        <div className="flex justify-end">
                            <NavLink route="/usuario" className="shadow mr-5 bg-slate-500 hover:bg-slate-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer">
                                Cancelar
                            </NavLink>
                            <Button onClick={() => { handleSubmit() }} className="shadow cursor-pointer bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                Editar
                            </Button>
                        </div>
                    </div>
                </div>
            </Main>
        </Default>
    )
}

export async function getServerSideProps(context: any) {
    const token = nookies.get(context).TOKEN_USER;

    if (token) {
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
    } else {
        return {
            destination: '/',
            permanet: false
        }
    }
}