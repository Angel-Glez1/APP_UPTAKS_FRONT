import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormProyecto from "../components/proyectos/FormProyecto";
import useProyectos from "../hooks/useProyectos"


const EditarProyecto = () => {

    const { id } = useParams();
    const { obtenerProyecto, proyecto, cargando, eliminarProyecto } = useProyectos();

    useEffect(() => {
        obtenerProyecto(id);
    }, [id]);

    const handleClick = () => {
        
    
        if (confirm('¿Deseas eliminar este proyecto?')) {
            eliminarProyecto(proyecto?._id);
        }
    }


    if (cargando) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="text-green-700 text-2xl font-bold">Cargando ...</h1>
            </div>
        )
    }


    const { nombre } = proyecto;
    return (
        <div>

            <div className="flex justify-between items-center">
                <h1 className="font-black text-4xl">Editar Proyecto: {nombre}</h1>

                <button onClick={handleClick} className="flex items-center flex-col justify-center gap-1 text-red-600" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                </button>

            </div>

            <div className="m-10 flex justify-center">
                <FormProyecto />
            </div>
        </div>
    )
}

export default EditarProyecto