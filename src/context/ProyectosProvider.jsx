import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/axios';



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

    useEffect(() => {

        console.log('Obtener Proyectos..');
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
                    msg: data.response.data.msg || 'Algo salio mal al momento de obtener los proyectos',
                    error: true
                });
            }
        }


        obtenerProyectos();


    }, []);


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



            const proyectoActulizado = { ...proyecto }
            proyectoActulizado.tareas = [data, ...proyecto.tareas]

            setProyecto(proyectoActulizado);

            setAlerta({});
            setModalFormularioTareas(false);




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


            const proyectoActulizado = { ...proyecto }

            proyectoActulizado.tareas = proyectoActulizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState);
            setProyecto(proyectoActulizado);


            setAlerta({});
            setModalFormularioTareas(false);

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

            const proyectoActulizado = { ...proyecto }
            proyectoActulizado.tareas = proyectoActulizado.tareas.filter(tareaState => tareaState._id !== tarea._id);


            // setAlerta({});
            setProyecto(proyectoActulizado);
            setModalEliminarTarea(false);
            setTarea({});
            newSuccess('Tarea Eliminada...');


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
                eliminarColaborador
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}



export { ProyectosProvider }

export default ProyectosContext;