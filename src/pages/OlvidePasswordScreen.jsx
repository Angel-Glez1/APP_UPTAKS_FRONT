import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';


const OlvidePasswordScreen = () => {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === '') {
            setAlerta({ msg: 'El email es obligatorio', error: true });
            return;
        }


        try {

            const { data } = await clienteAxios.post('/auth/olvide-password', { email });
            setAlerta({ msg: data.msg, error: false });
            setEmail('');

        } catch (error) {

            setAlerta({ msg: error?.response?.data?.msg, error: true });

        }
    }

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center">
                Recupera tu acceso y no para no perder tus <span className="text-slate-700">proyectos</span>
            </h1>

            {msg && (<Alerta alerta={alerta} />)}

            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>



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

                <input
                    type="submit"
                    value='Enviar'
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
                    to={'/registar'}
                >
                    ¿No tienes una cuenta ? Registrate
                </Link>

            </nav>
        </>
    )
}

export default OlvidePasswordScreen