import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthLayout = () => {


    const { auth, cargando } = useAuth();



    if (cargando) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="text-green-700 text-2xl font-bold">Cargando ...</h1>
            </div>
        )
    }

    return (
        <>

            {
                auth?._id
                    ? <Navigate to={'/proyectos'} />
                    : (
                        <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">

                            <div className="md:w-2/3 lg:w-2/5">
                                <Outlet />
                            </div>
                        </main>
                    )


            }

        </>
    )
}

export default AuthLayout;