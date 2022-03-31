import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Proyecto from './components/proyectos/Proyecto';
import { AuthProvider } from './context/AuthProvider';
import { ProyectosProvider } from './context/ProyectosProvider';
import AuthLayout from './layouts/AuthLayout';
import RutaProtegida from './layouts/RutaProtegida';
import ConfirmarCuentaScreen from './pages/ConfirmarCuentaScreen';
import EditarProyecto from './pages/EditarProyecto';
import LoginScreen from './pages/LoginScreen';
import NuevoColaboradorSreen from './pages/NuevoColaboradorSreen';
import NuevoPasswordScreen from './pages/NuevoPasswordScreen';
import NuevoProyectoScreen from './pages/NuevoProyectoScreen';
import OlvidePasswordScreen from './pages/OlvidePasswordScreen';
import ProyectosScreen from './pages/ProyectosScreen';
import RegistroScreen from './pages/RegistroScreen';


const App = () => {

    // console.log(import.meta.env.VITE_URL_BACKEND);


    return (
        <BrowserRouter>
            <AuthProvider>
                <ProyectosProvider>
                    <Routes>

                        <Route path='/' element={<AuthLayout />} >
                            <Route index element={<LoginScreen />} />
                            <Route path='registar' element={<RegistroScreen />} />
                            <Route path='olvide-password' element={<OlvidePasswordScreen />} />
                            <Route path='olvide-password/:token' element={<NuevoPasswordScreen />} />
                            <Route path='confirmar-cuenta/:token' element={<ConfirmarCuentaScreen />} />

                        </Route>


                        <Route path='/proyectos' element={<RutaProtegida />}>
                            <Route index element={<ProyectosScreen />} />
                            <Route path='crear-proyecto' element={<NuevoProyectoScreen />} />
                            <Route path='nuevo-colaborador/:id' element={<NuevoColaboradorSreen />} />
                            <Route path='editar/:id' element={<EditarProyecto />} />
                            <Route path=':id' element={<Proyecto />} />
                        </Route>

                    </Routes>
                </ProyectosProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}


export default App;