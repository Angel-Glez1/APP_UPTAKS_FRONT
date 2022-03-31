import FormProyecto from "../components/proyectos/FormProyecto"


const NuevoProyectoScreen = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Proyecto</h1>

      <div className="m-10 flex justify-center">
        <FormProyecto />
      </div>
    </>
  )
}

export default NuevoProyectoScreen