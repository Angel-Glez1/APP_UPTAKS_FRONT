import React from 'react'
import { formatDate } from '../../helpers/formatDate'
import useAdmin from '../../hooks/useAdmin';
import useProyectos from '../../hooks/useProyectos'

const Tarea = ({ tarea }) => {

    const admin = useAdmin();
    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos();
    const { nombre, prioridad, descripcion, fechaEntrega, _id, estado, completo } = tarea


    return (
        <div className='border-b p-5 flex justify-between items-center'>
            <div className=''>
                <p className="mb-1 text-2xl">{nombre}</p>
                <p className="mb-1 text-xl text-gray-500">{descripcion?.substring(0, 40)}...</p>
                <p className="mb-1 text-sm font-semibold">{formatDate(fechaEntrega)}</p>
                <p className="mb-1 text-gray-600">Preoridad {prioridad}</p>
                {estado && <p className='text-xs bg-green-400 uppercase text-center rounded-lg font-bold p-2 w-3/6' >Completada por: { completo?.nombre } </p> }
            </div>

            <div className="flex gap-2">
                {
                    admin && (

                        <button className='bg-indigo-600 px-4 py-3 text-white 
                    uppercase font-bold text-sm rounded-lg'
                            onClick={() => handleModalEditarTarea({ nombre, prioridad, descripcion, fechaEntrega, _id, estado })}
                        >
                            Editar
                        </button>
                    )
                }


                <button 
                    className={`${estado ? 'bg-sky-600' : ' bg-gray-600'} 
                    px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                    onClick={() => completarTarea(_id)}
                >
                    {estado ? 'Completa' : 'Incompleta'}
                </button>



                {
                    admin && (

                        <button
                            className='bg-red-600 px-4 py-3 text-white 
                    uppercase font-bold text-sm rounded-lg'
                            onClick={() => handleModalEliminarTarea({ nombre, prioridad, descripcion, fechaEntrega, _id, estado })}
                        >
                            Borrar
                        </button>
                    )
                }


            </div>
        </div>
    )
}

export default Tarea