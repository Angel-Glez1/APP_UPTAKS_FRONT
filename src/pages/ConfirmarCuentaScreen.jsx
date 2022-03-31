import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';


const ConfirmarCuentaScreen = () => {

    const { token } = useParams();
    const [alerta, setAlerta] = useState({});
    const [confirmada, setConfirmada] = useState(false);


    useEffect(() => {

        const confirmarCuenta = async () => {

            try {

                const URL = `/auth/confirmar/${token}`;
                const { data } = await clienteAxios.get(URL);

                setAlerta({ msg: data.msg, error: false });
                setConfirmada(true);

            } catch (error) {

                setAlerta({
                    msg: error?.response?.data?.msg || 'Algo salio mal al momento de confirmar la cuenta',
                    error: true
                })
            }

        }

        confirmarCuenta();

    }, []);

    const { msg } = alerta;
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center">
                Confirma tu cuenta y empiza a crear tus  <span className="text-slate-700">proyectos</span>
            </h1>


            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white'>
                {msg && <Alerta alerta={alerta} />}

                {confirmada && (
                    <Link
                        className='block text-center my-5 text-gray-500 uppercase text-sm'
                        to={'/'}
                    >
                        Iniciar sesion
                    </Link>
                )}
            </div>
        </>
    )
}

export default ConfirmarCuentaScreen