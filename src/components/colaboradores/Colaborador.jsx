import React from 'react'
import useProyectos from '../../hooks/useProyectos';

const Colaborador = ({ colaborador }) => {

    const { handleModalEliminarColaborado } = useProyectos();
    const { nombre, email, _id } = colaborador;
    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p className="text-2xl font-bold">{nombre}</p>
                <p className="text-sm text-gray-700 ">{email}</p>
            </div>
            <div>
                <button
                    type='button'
                    className='bg-red-600 px-4 py-3 text-white
                    uppercase font-bold text-sm rounded-lg'
                    onClick={() => handleModalEliminarColaborado(colaborador)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Colaborador