import { useState } from 'react';
import useProyectos from '../../hooks/useProyectos';
import Alerta from '../Alerta';

const FormularioColaborador = () => {

    const { alerta, newError, searchColaborador } = useProyectos();
    const [email, setEmail] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (email === '') {
            newError('El correo es obligatorio');
            return;
        }

        await searchColaborador(email);
        setEmail('');


    }

    

    const { msg } = alerta;
    return (
        <form
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {msg && <Alerta alerta={alerta} />}
            <div className='mb-5'>
                <label htmlFor="nombre"
                    className='text-gray-700 uppercase text-sm'
                >
                    Email colaborador
                </label>
                <input
                    autoComplete='off'
                    type="email"
                    id='email'
                    placeholder='Email del colaborador'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-50 rounded-sm outline-none '
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <input
                type="submit"
                value='buscar'
                className="bg-sky-600 hover:bg-sky-700
                            w-full p-3 text-white uppercase font-bold
                            transition-colors rounded cursor-pointer"
            />

        </form>
    )
}

export default FormularioColaborador