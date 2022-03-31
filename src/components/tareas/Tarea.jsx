import React from 'react'
import { formatDate } from '../../helpers/formatDate'
import useProyectos from '../../hooks/useProyectos'

const Tarea = ({ tarea }) => {

    const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();
    const { nombre, prioridad, descripcion, fechaEntrega, _id, estado } = tarea

    return (
        <div className='border-b p-5 flex justify-between items-center'>
            <div className=''>
                <p className="mb-1 text-2xl">{nombre}</p>
                <p className="mb-1 text-xl text-gray-500">{descripcion?.substring(0, 40)}...</p>
                <p className="mb-1 text-sm font-semibold">{formatDate(fechaEntrega)}</p>
                <p className="mb-1 text-gray-600">Preoridad {prioridad}</p>
            </div>

            <div className="flex gap-2">

                <button className='bg-indigo-600 px-4 py-3 text-white 
                    uppercase font-bold text-sm rounded-lg'
                    onClick={() => handleModalEditarTarea({ nombre, prioridad, descripcion, fechaEntrega, _id, estado })}
                >
                    Editar
                </button>

                {
                    estado
                        ? (
                            <button className='bg-sky-600 px-4 py-3 text-white 
                        uppercase font-bold text-sm rounded-lg'
                            >
                                Completa
                            </button>
                        )
                        : (
                            <button className='bg-gray-600 px-4 py-3 text-white 
                            uppercase font-bold text-sm rounded-lg'
                            >
                                Incompleta
                            </button>
                        )
                }





                <button
                    className='bg-red-600 px-4 py-3 text-white 
                    uppercase font-bold text-sm rounded-lg'
                    onClick={ () => handleModalEliminarTarea({ nombre, prioridad, descripcion, fechaEntrega, _id, estado }) }
                >
                    Borrar
                </button>

            </div>
        </div>
    )
}

export default Tarea