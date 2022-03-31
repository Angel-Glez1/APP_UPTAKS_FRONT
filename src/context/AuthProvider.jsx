import { useState, useEffect, createContext } from 'react'
import {useNavigate} from 'react-router-dom'
import clienteAxios from '../config/axios';


const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);


    useEffect(() => {

        const checkAuth = async () => {

            // console.log('Revisando autentificacion');

            const token = localStorage.getItem('token-uptaks') || '';

            if (!token) {
                setCargando(false);
                return;
            }

            try {

                const config = {
                    headers: {
                        "Content-Type": "applicacation/json",
                        "Authorization": `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.get('/user', config)
                setAuth(data);
                // navigate('/proyectos');

            } catch (error) {

                setAuth({});
            }

            setCargando(false);

        }

        checkAuth();

    }, []);


    const login = (user) => setAuth(user);


    return (
        <AuthContext.Provider
            value={{
                login,
                auth,
                cargando

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext