import { useState } from 'react';

const useAlerta = () => {

    const [alerta, setAlerta] = useState({});


    const newError = (msg) => {
        setAlerta({ error: true, msg });
        setTimeout(() => resetAlerta(), 2000);
    };


    const newSuccess = (msg) => {
        setAlerta({ error: false, msg });
        setTimeout(() => resetAlerta(), 2000);
    }

    const resetAlerta = () => setAlerta();



    return {
        alerta,
        newError,
        newSuccess,
        resetAlerta
    }

}

export default useAlerta;