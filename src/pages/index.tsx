import type { NextPage } from 'next'
import { InputHTMLAttributes, useState } from "react";
import Button from '../components/button';
import Main from '../components/main'
import NavLink from '../components/navlink'
import Text from '../components/text'
import Title from '../components/title'
import Default from '../layout/default'
import ProfileService from '../services/ProfileService';
import styles from '../styles/Home.module.css'
import nookies from "nookies";

export function InputLogin({ ...rest }: InputHTMLAttributes<any>) {
  return (
    <>
      <input className="appearance-none bg-transparent border-none w-full text-black mr-3 y-1 px-2 leading-tight focus:outline-none" {...rest} />
    </>
  )
}



const Home: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email || !password) {
      alert('Insira as credências');
      return;
    }

    const credentials = {
      email,
      password
    }

    const [data, error] = await ProfileService.login(credentials);



    if (!error) {
      nookies.set(null, 'TOKEN_USER', data.token);
      window.location.href = '/usuario';
      return;
    } else {
      const message = error.response.data.message;
      alert(message);
      return;
    }
  }

  return (
    <Default titlePage='Sejá bem víndo' className={styles.container}>
      <Main>
        <div className="flex items-center border-b border-purple-500 py-2 bg-white">
          <InputLogin value={email} type="email" placeholder="E-mail" onChange={(e) => { setEmail(e.target.value) }} />
          <InputLogin value={password} type="password" placeholder="Senha" onChange={(e) => { setPassword(e.target.value) }} />
          <Button onClick={() => { handleLogin() }} className="flex-shrink-0 mr-5 bg-purple-500 hover:bg-purple-700 border-purple-500  hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded">
            Entrar
          </Button>
        </div>
        <div className='flex items-center h-screen text-white'>
          <div className='ml-10'>
            <Title className='text-7xl'>
              Lorem Ipsum
            </Title>
            <Text className='text-3xl leading-relaxed my-10' style={{ width: "50rem" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the
              <br /> Images from <a href="https://br.freepik.com/fotos-vetores-gratis/imagens" target={"_blank"} rel={"noreferrer"} className='underline'>Freepik</a>
            </Text>
            <div className="flex justify-between items-center w-96">
              <NavLink route='/cadastrar' className='w-36 text-center bg-purple-500 p-5 rounded-full font-semibold hover:bg-transparent transition-all cursor-pointer border'>
                Cadastrar
              </NavLink>
            </div>
          </div>
        </div>
      </Main>
    </Default>
  )
}

export default Home

export async function getServerSideProps(context: any) {
  const token = nookies.get(context).TOKEN_USER;

  if (token) {
    const [data, error] = await ProfileService.get(token);
    if (!error) {
      return {
        redirect: {
          destination: '/usuario',
          permanet: false
        }
      }
    } else {
      nookies.destroy(context, 'TOKEN_USER');
      return {
        props: {}
      }
    }
  }
  return {
    props: {}
  }
}