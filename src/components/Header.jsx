import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="px-4 py-5 bg-white border-b ">
            <div className="md:flex md:justify-between md:items-center">

                <h2 className="text-4xl text-sky-600 text-center font-bold">
                    UP-TAKS
                </h2>

                <input
                    className="rounded-lg lg:w-96 block p-2 border "
                    type="search"
                    name=""
                    id=""
                    placeholder="Buscar proyectos"
                />

                <div className='flex items-center gap-4'>
                    <Link to={'/proyectos'} className="font-bold uppercase">
                        Proyectos
                    </Link>

                    <button className='text-white bg-red-500 text-sm uppercase font-bold p-2 rounded'>
                        Cerrar Sesion
                    </button>
                </div>


            </div>
        </header>
    )
}

export default Header