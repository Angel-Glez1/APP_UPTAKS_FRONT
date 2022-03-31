import ProyectoPreview from "../components/proyectos/ProyectoPreview";
import useProyectos from "../hooks/useProyectos"


const ProyectosScreen = () => {

    const { proyectos } = useProyectos();


    return (
        <>
            <h1 className="text-4xl font-black mb-5">Tus Proyectos</h1>

            <div className="bg-white shadow rounded-md ">
                {
                    proyectos.length
                        ? proyectos.map(proyecto => <ProyectoPreview key={proyecto._id} proyecto={proyecto} />)
                        : <p className="mt-5 text-center text-gray-600 uppercase p-5">No hay proyectos</p>
                }
            </div>
        </>
    )
}

export default ProyectosScreen