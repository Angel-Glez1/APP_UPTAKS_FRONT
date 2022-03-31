import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import FormularioColaborador from '../components/colaboradores/FormularioColaborador'
import useProyectos from '../hooks/useProyectos';

const NuevoColaboradorSreen = () => {

    const { obtenerProyecto, proyecto, cargando, colaborador,agregarColaborador } = useProyectos();
    const { id } = useParams();

    useEffect(() => {

        obtenerProyecto(id);

    }, []);



    return (
        <>
            <h1 className="text-4xl font-black">
                Añadir Colaborador al proyecto:
                <p className='text-sky-500'>{' ' + proyecto?.nombre}</p>
            </h1>

            <div className="mt-10 flex justify-center">
                <FormularioColaborador />
            </div>

            {
                cargando
                    ? <p className='mt-5 text-center'>'Cargando...'</p>
                    : colaborador?._id && (
                        <div className="flex justify-center mt-5">
                            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
                                <h1 className="text-center mb-10 text-2xl font-bold"> Resultado </h1>

                                <div className="flex justify-between items-center">
                                    <p>{colaborador.nombre}</p>

                                    <button
                                        type='button'
                                        className='bg-slate-500 px-5 py-2 rounded uppercase
                                        text-white font-bold text-sm'
                                        onClick={() => agregarColaborador({ email: colaborador.email})}
                                    >
                                        Agregar al proyecto
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
            }


        </>
    )
}

export default NuevoColaboradorSreen