import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';



const NuevoPasswordScreen = () => {

    const { token } = useParams();
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [confirmado, setConfirmado] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {

        const comprobarToken = async () => {


            try {

                // TOOD :: MOVER CLIENTE AXIOS.
                const URL = `/auth/olvide-password/${token}`;
                await clienteAxios.get(URL);
                setTokenValido(true);

            } catch (error) {
                setAlerta({ msg: error?.response?.data?.msg, error: true });
            }

        }


        comprobarToken();


    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (password.length < 4) {
            setAlerta({ error: true, msg: 'El password es muy contro' });
            return;
        }

        try {

            const URL = `/auth/olvide-password/${token}`;
            await clienteAxios.post(URL, { password });
            setConfirmado(true);
            setPassword('');

        } catch (error) {
            setAlerta({
                error: true,
                msg: error.response.data.msg
            });
        }
    }


    const { msg } = alerta;

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center">
                Reestablece tu password y no pierdas tus <span className="text-slate-700">proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />}

            {
                tokenValido &&
                (
                    <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit} >


                        <div className='my-5'>
                            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Nuevo Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Ingresa tu nuevo password..."
                                className="w-full mt-3 p-3 border rounded-sm bg-gray-50"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value='Reestablecer password'
                            className="w-full bg-sky-700 mt-3 p-3
                            text-white  uppercase font-bold rounded 
                            hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"
                        />
                    </form>
                )
            }

            {
                confirmado &&
                (
                    <Link
                        className='block text-center my-5 text-gray-500 uppercase text-sm'
                        to={'/'}
                    >
                        Iniciar sesion
                    </Link>
                )
            }


        </>
    )
}

export default NuevoPasswordScreen