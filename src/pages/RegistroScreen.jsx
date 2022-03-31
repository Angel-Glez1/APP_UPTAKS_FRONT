import { useState } from 'react';
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const RegistroScreen = () => {


    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();


        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return
        }

        if (password !== repetirPassword) {
            setAlerta({ msg: 'Los passwords no son iguales', error: true });
            return
        }

        setAlerta({});

        try {

            const { data } = await clienteAxios.post('/auth', { nombre, password, email });            
            setAlerta({ msg: data.msg, error: false });
            setNombre('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');


        } catch (error) {

            setAlerta({msg: error?.response?.data?.msg, error: true});
        }
    }

    const { msg } = alerta

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center">
                Crear tu cuenta y administra tus <span className="text-slate-700">proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />}

            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit} >

                <div className='my-5'>
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Ingresa tu nombre..."
                        className="w-full mt-3 p-3 border rounded-sm bg-gray-50"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className='my-5'>
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ingresa tu email..."
                        className="w-full mt-3 p-3 border rounded-sm bg-gray-50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className='my-5'>
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">Repitir Password</label>
                    <input
                        type="password"
                        name="password2"
                        id="password2"
                        placeholder="Ingresa tu password..."
                        className="w-full mt-3 p-3 border rounded-sm bg-gray-50"
                        value={repetirPassword}
                        onChange={(e) => setRepetirPassword(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value='Crear cuenta'
                    className="w-full bg-sky-700 mt-3 p-3
                    text-white  uppercase font-bold rounded 
                    hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"
                />
            </form>

            <nav className="lg:flex lg:justify-between ">
                <Link
                    className='block text-center my-5 text-gray-500 uppercase text-sm'
                    to={'/'}
                >
                    ¿Ya tienes una cuenta ? Iniciar sesion
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

export default RegistroScreen