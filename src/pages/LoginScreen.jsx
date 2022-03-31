import { useState } from 'react';
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {

    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();


        if ([email, password].includes('')) {
            setAlerta({ error: true, msg: 'Todos los campos son obligatorios' });
            return
        }


        try {

            const { data } = await clienteAxios.post('/auth/login', { email, password });
            localStorage.setItem('token-uptaks', data.token);

            login(data)
            setAlerta({});


        } catch (error) {
            setAlerta({ msg: true, msg: error.response.data.msg });
        }


    }

    const { msg } = alerta;
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center">
                Inicia sesión y administra tus <span className="text-slate-700">proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />}

            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit} >

                <div className='my-5'>
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ingresa tu email..."
                        className="w-full mt-3 p-3 border rounded-sm bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='my-5'>
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Ingresa tu password..."
                        className="w-full mt-3 p-3 border rounded-sm bg-gray-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>


                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="w-full bg-sky-700 mt-3 p-3
                    text-white  uppercase font-bold rounded 
                    hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"
                />
            </form>

            <nav className="lg:flex lg:justify-between ">
                <Link
                    className='block text-center my-5 text-gray-500 uppercase text-sm'
                    to={'/registar'}
                >
                    ¿No tienes una cuenta ? Registrate
                </Link>

                <Link
                    className='block text-center my-5 text-gray-500 uppercase text-sm'
                    to={'/olvide-password'}
                >
                    Olvide mi Password
                </Link>

            </nav>
        </>
    )
}

export default LoginScreen