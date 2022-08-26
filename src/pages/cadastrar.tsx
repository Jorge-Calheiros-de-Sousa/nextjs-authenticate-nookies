import { useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import Main from "../components/main";
import NavLink from "../components/navlink";
import TextArea from "../components/textarea";
import Default from "../layout/default";
import styles from "../styles/Home.module.css";
import ProfileService from "../services/ProfileService";

export default function Cadastrar() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [description, setDescription] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [github, setGitHub] = useState('');
    const [loading, setLoading] = useState(false);
    const [messageUser, setMessageUser] = useState('Carregando...');

    async function handleSubmit() {
        setLoading(true);
        if (!name || !email || !phone || !password || !confirmPassword || !linkedin || !github) {
            alert('Preencha o formulário');
            return
        } else if (password !== confirmPassword) {
            alert('As senhas não são iguais');
            return;
        }
        const form = {
            name,
            email,
            phone,
            password,
            confirmPassword,
            description,
            linkedin,
            github
        }

        const secondsToWait = 5000;

        const [data, error] = await ProfileService.register(form);
        if (!error) {
            setTimeout(() => {
                setMessageUser('Cadastrado com sucesso!');
            }, secondsToWait - 2000)
            setTimeout(() => {
                window.location.href = '/';
            }, secondsToWait)
        } else {
            setTimeout(() => {
                setMessageUser('Error');
            }, secondsToWait - 2000)
            setTimeout(() => {
                setLoading(false);
                window.location.href = '/';
            }, secondsToWait)
        }
    }

    return (
        <Default titlePage="Cadastrar" isLoading={loading} messageLoading={messageUser} className={styles.container}>
            <Main className="h-screen flex justify-center items-center">
                <div className="bg-white rounded p-10 flex justify-between ">
                    <div>
                        <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} maxLength={50} />
                        <Input label="E-mail" value={email} type="email" onChange={(e) => setEmail(e.target.value)} maxLength={50} />
                        <Input label="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <Input label="Senha" type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} maxLength={8} />
                        <Input label="Digite a senha novamente" type={"password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} maxLength={8} minLength={8} />
                        <TextArea label="Descrição" requiredInput={false} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={200} />
                        <Input label="Linkendin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} maxLength={50} />
                        <Input label="Github" value={github} onChange={(e) => setGitHub(e.target.value)} maxLength={50} />

                        <div className="text-red-600 text-right mb-10">
                            * Campo obrigátorio
                        </div>
                        <div className="flex justify-end">
                            <NavLink route="/" className="shadow mr-5 bg-slate-500 hover:bg-slate-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer">
                                Cancelar
                            </NavLink>
                            <Button onClick={() => { handleSubmit() }} className="shadow cursor-pointer bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                Cadastrar
                            </Button>
                        </div>
                    </div>
                </div>
            </Main>
        </Default >
    )
}

export function getServerSideProps() {
    return {
        props: {}
    }
}