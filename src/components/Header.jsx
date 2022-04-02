import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import useProyectos from '../hooks/useProyectos'
import Busqueda from './Busqueda';

const Header = () => {

    const { handleBuscador, buscador, cerrarSesionProyectos } = useProyectos();
    const { logout } = useAuth();

    const cerrarSesion = () => {
        cerrarSesionProyectos();
        logout();
    }


    return (
        <header className="px-4 py-5 bg-white border-b ">
            <div className="md:flex md:justify-between md:items-center">

                <h2 className="text-4xl text-sky-600 text-center font-bold mb-5 md:mb-0">
                    UP-TAKS
                </h2>

                <div className='flex flex-col md:flex-row items-center gap-4'>
                    <button
                        type='button'
                        className='font-bold uppercase'
                        onClick={handleBuscador}
                    >
                        Buscar Proyecto
                    </button>


                    <Link to={'/proyectos'} className="font-bold uppercase">
                        Proyectos
                    </Link>

                    <button
                        className='text-white bg-red-500 text-sm uppercase font-bold p-2 rounded'
                        onClick={cerrarSesion}
                    >
                        Cerrar Sesion
                    </button>
                </div>
            </div>

            <Busqueda />
        </header>
    )
}

export default Header