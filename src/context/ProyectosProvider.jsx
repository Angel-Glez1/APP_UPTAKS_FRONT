import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/axios';
import io from 'socket.io-client'
import useAuth from '../hooks/useAuth';

let socket;



const ProyectosContext = createContext();


const ProyectosProvider = ({ children }) => {

    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioTareas, setModalFormularioTareas] = useState(false);
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
    const [tarea, setTarea] = useState({});
    const [colaborador, setColaborador] = useState({});
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);
    const [buscador, setBuscador] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {

        const obtenerProyectos = async () => {

            try {
                const token = localStorage.getItem('token-uptaks') || '';
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.get('/proyecto', config);
                setProyectos(data);

            } catch (error) {

                setAlerta({
                    msg: error.response.data.msg || 'Algo salio mal al momento de obtener los proyectos',
                    error: true
                });

                setTimeout(() => {
                    setAlerta({});
                }, 2000)
            }
        }


        obtenerProyectos();


    }, [auth]);

    useEffect(() => {
        socket = io(import.meta.env.VITE_URL_BACKEND);
    }, []);

    const handleBuscador = () => setBuscador(!buscador);

    const newError = (msg) => {
        setAlerta({ error: true, msg });
        setTimeout(() => setAlerta({}), 2000);
    }

    const newSuccess = (msg) => {
        setAlerta({ error: false, msg });
        setTimeout(() => setAlerta({}), 2000);
    }

    const submitProyecto = async (proyecto) => {

        if (proyecto.id) {

            await actulizarProyecto(proyecto);

        } else {

            await crearProyecto(proyecto);
        }

    }

    const actulizarProyecto = async (proyecto) => {

        try {

            const token = localStorage.getItem('token-uptaks') || '';
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }


            // New Proyecto
            const { data } = await clienteAxios.put(`/proyecto/${proyecto.id}`, proyecto, config);
            const newState = proyectos.map(proyecto => proyecto._id === data._id ? data : proyecto);
            setProyectos(newState);
            newSuccess('Proyecto Actulizado...');
            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos')
            }, 1500);


        } catch (error) {

            console.log(error?.response);

        }
    }

    const crearProyecto = async (proyecto) => {
        try {

            const token = localStorage.getItem('token-uptaks') || '';
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }


            // New Proyecto
            const { data } = await clienteAxios.post('/proyecto', proyecto, config);
            setProyectos([data, ...proyectos]);
            newSuccess('Proyecto creado correctamente');


            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos')
            }, 1500);


        } catch (error) {

            console.log(error?.response);

        }
    }

    const obtenerProyecto = async (id = '') => {

        setCargando(true);

        try {

            const token = localStorage.getItem('token-uptaks') || '';
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.get(`/proyecto/${id}`, config);

            setProyecto(data);

        } catch (error) {

            navigate('/proyectos');
            setAlerta({
                error: true,
                msg: error.response.data.msg || 'Error al obtener el proyecto',
            });

        }

        setCargando(false)
    }

    const eliminarProyecto = async (id) => {

        try {

            const token = localStorage.getItem('token-uptaks') || '';
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            await clienteAxios.delete(`/proyecto/${id}`, config);
            const newState = proyectos.filter(proyecto => proyecto._id !== id);
            setProyectos(newState);

            newSuccess('Proyecto Eliminado');

            setTimeout(() => {
                setAlerta();
                navigate('/proyectos');
            }, 1500);



        } catch (error) {

            setAlerta({
                error: true,
                msg: error.response.data.msg || 'Error al obtener el proyecto',
            });

        }
    }

    const saveTarea = async (tarea) => {


        if (tarea?.id) {

            await actulizarTarea(tarea);

        } else {

            await crearTarea(tarea);
        }



    }

    const crearTarea = async (tarea) => {

        try {

            const token = localStorage.getItem('token-uptaks') || '';
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }


            // New Proyecto
            const { data } = await clienteAxios.post('/tareas', tarea, config);


            setAlerta({});
            setModalFormularioTareas(false);

            // Socket
            socket.emit('nueva-tarea', data);



        } catch (error) {

            console.log(error?.response);

        }
    }

    const actulizarTarea = async (tarea) => {

        try {

            const token = localStorage.getItem('token-uptaks') || '';
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }


            // New Proyecto
            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);

            setModalFormularioTareas(false);

            // actualizarTareas(data);

            // Socket
            socket.emit('update-tarea', data)

            setAlerta({});
        } catch (error) {

            console.log(error?.response);

        }

    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea);
        setModalFormularioTareas(true);
    }

    const handleModalTareas = () => {
        setTarea({});
        setModalFormularioTareas(!modalFormularioTareas);
    }

    const handleModalEliminarTarea = tarea => {

        setTarea(tarea);
        setModalEliminarTarea(!modalEliminarTarea);
    }

    const eliminarTarea = async () => {
        try {

            const token = localStorage.getItem('token-uptaks') || '';
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            await clienteAxios.delete(`/tareas/${tarea._id}`, config);


            setModalEliminarTarea(false);

            // Socket
            socket.emit('eliminar-tarea', { ...tarea, proyecto: proyecto._id });


            newSuccess('Tarea Eliminada...');
            setTarea({});

        } catch (error) {
            console.log(error);
        }
    }

    const searchColaborador = async email => {

        setCargando(true);
        try {

            const token = localStorage.getItem('token-uptaks') || '';
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/proyecto/colaboradoresSearch`, { email }, config);

            setColaborador(data);


        } catch (error) {

            const msg = error?.response?.data?.msg || 'Error! No se logro hacer la peticion para buscar al colaborador';
            newError(msg);
            setColaborador({});

        }
        setCargando(false);
    }


    const agregarColaborador = async email => {


        try {

            const token = localStorage.getItem('token-uptaks') || '';
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/proyecto/colaboradores/${proyecto._id}`, email, config);

            newSuccess(data.msg);
            setColaborador({});


        } catch (error) {

            const msg = error?.response?.data?.msg || 'Error! No se logro hacer la peticion para buscar al colaborador';
            newError(msg);
            setColaborador({});

        }


    }

    const eliminarColaborador = async () => {


        try {

            const token = localStorage.getItem('token-uptaks') || '';
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/proyecto/colaboradores-eliminar/${proyecto._id}`, { id: colaborador._id }, config);

            // Actulizar el objeto
            const proyectoActulizado = { ...proyecto }
            proyectoActulizado.colaboradores = proyectoActulizado.colaboradores.filter(c => c._id !== colaborador._id);


            setProyecto(proyectoActulizado)
            setAlerta({ error: false, msg: data.msg });
            setColaborador({});
            setModalEliminarColaborador(false);


        } catch (error) {

            console.log(error);
            const msg = error?.response?.data?.msg || 'Error! No se logro hacer la peticion para buscar al colaborador';
            setAlerta({ error: true, msg });

        }


    }

    const handleModalEliminarColaborado = (colaborador) => {

        setColaborador(colaborador)
        setModalEliminarColaborador(!modalEliminarColaborador);
    }

    const completarTarea = async id => {

        try {


            const token = localStorage.getItem('token-uptaks') || '';
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/tareas/estado/${id}`, { id: colaborador._id }, config);


            socket.emit('estado-tarea', data);

            setAlerta({});


        } catch (error) {
            console.log(error);
            console.log(error?.response);
        }
    }

    const submitTareasProyectos = (tarea) => {

        const proyectoActulizado = { ...proyecto }
        proyectoActulizado.tareas = [tarea, ...proyectoActulizado.tareas]
        setProyecto(proyectoActulizado);
    }

    const eliminarTareasProyecto = (tarea) => {
        const proyectoActulizado = { ...proyecto }
        proyectoActulizado.tareas = proyectoActulizado.tareas.filter(tareaState => tareaState._id !== tarea._id);
        setProyecto(proyectoActulizado);
    }

    const actualizarTareas = (tarea) => {

        const proyectoActulizado = { ...proyecto }
        proyectoActulizado.tareas = proyectoActulizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState);
        setProyecto(proyectoActulizado);
    }

    const estadoTarea = (tarea) => {

        const proyectoActulizado = { ...proyecto }
        proyectoActulizado.tareas = proyectoActulizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState);
        setProyecto(proyectoActulizado);
    }

    const cerrarSesionProyectos = () => {

        setProyectos([]);
        setAlerta({});
        setProyecto({});
        setTarea({});
        setColaborador({});
        setBuscador(false);


    }

    return (
        <ProyectosContext.Provider
            value={{
                alerta,
                proyectos,
                submitProyecto,
                newError,
                newSuccess,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                handleModalTareas,
                modalFormularioTareas,
                saveTarea,
                handleModalEditarTarea,
                tarea,
                modalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                searchColaborador,
                colaborador,
                agregarColaborador,
                handleModalEliminarColaborado,
                modalEliminarColaborador,
                eliminarColaborador,
                completarTarea,
                handleBuscador,
                buscador,
                submitTareasProyectos,
                eliminarTareasProyecto,
                actualizarTareas,
                estadoTarea,
                cerrarSesionProyectos
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}



export { ProyectosProvider }

export default ProyectosContext;