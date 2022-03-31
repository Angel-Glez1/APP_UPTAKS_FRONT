import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import useAuth from '../hooks/useAuth';

const RutaProtegida = () => {

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
                    ? (
                        <div className='bg-gray-100'>
                            <Header />

                            <div className='md:flex md:min-h-screen'>
                                <SideBar />

                                <main className='flex-1 p-10'>
                                    <Outlet />
                                </main>
                            </div>
                        </div>

                    )
                    : (<Navigate to={'/'} />)
            }
        </>
    )
}

export default RutaProtegida