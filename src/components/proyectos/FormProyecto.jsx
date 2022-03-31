import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useProyectos from '../../hooks/useProyectos';
import Alerta from '../Alerta';



const FormProyecto = () => {

    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');
    const { submitProyecto, newError, alerta, proyecto } = useProyectos();
    const params = useParams();

    useEffect(() => {

        if (params.id) {
            setId(proyecto._id)
            setNombre(proyecto.nombre);
            setDescripcion(proyecto.descripcion);
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
            setCliente(proyecto.cliente);
        }

    }, [params]);




    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            newError('Todos los campos son obligatorios');
            return;
        }

        await submitProyecto({ nombre, descripcion, fechaEntrega, cliente, id });
        
        setId(null)
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('');

    }



    return (
        <form className="bg-white py-10 px-5 md:w-2/3 rounded-lg shadow" onSubmit={handleSubmit}>

            {alerta?.msg && <Alerta alerta={alerta} />}
            <div className="mb-5" >
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="nombre">
                    Nombre Proyecto
                </label>
                <input
                    id="nombre"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400
                    rounded outline-none focus:border-gray-400"
                    autoComplete='off'
                    placeholder="Nombre del proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5" >
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="descripcion">
                    Descripcion del Proyecto
                </label>
                <textarea
                    id="descripcion"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400
                    rounded outline-none focus:border-gray-400"
                    placeholder="Descripcion del proyecto"
                    autoComplete='off'
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>

            <div className="mb-5" >
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="fecha-entrega">
                    Fecha de Entrega
                </label>
                <input
                    id="fecha-entrega"
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400
                    rounded outline-none focus:border-gray-400"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>

            <div className="mb-5" >
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="cliente">
                    Cliente
                </label>
                <input
                    id="cliente"
                    autoComplete='off'
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400
                    rounded outline-none focus:border-gray-400"
                    placeholder='Nombre del cliente'
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>


            <div className="mb-5" >
                <input
                    type="submit"
                    value={(id ? 'Actulizar' : 'Crear') + ' proyecto '}
                    className='bg-sky-600 w-full p-3 text-white uppercase font-bold block
                    mt-5 text-center rounded-md'
                />
            </div>


        </form>
    )
}

export default FormProyecto