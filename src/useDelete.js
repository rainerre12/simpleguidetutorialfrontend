import { useState } from 'react';
import axios from 'axios';

const useDelete = (url) => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async (id) => {
        setIsPending(true);
        setError(null);

        try {
            await axios.delete(`${url}/${id}`);
            setIsPending(false);
        } catch (err) {
            setIsPending(false);
            setError(err.message);
            throw err;
        }
    };

    return { deleteData, isPending, error };
};

export default useDelete;
