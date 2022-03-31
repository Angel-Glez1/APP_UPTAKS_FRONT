import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const SideBar = () => {

  const { auth } = useAuth();

  return (
    <aside className='md:w-80 lg:w-96 px-5 py-10  ' >
      <p className="text-3xl font-bold text-center"> Hola {auth.nombre}  </p>

      <Link
        to={'crear-proyecto'}
        className='bg-sky-600 w-full p-3 text-white uppercase font-bold block
        mt-5 text-center rounded-md'
      >
        Crear Proyecto
      </Link>
    </aside>
  )
}

export default SideBar