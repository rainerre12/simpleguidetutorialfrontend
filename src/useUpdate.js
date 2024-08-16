import { useState } from 'react';
import axios from 'axios';

const useUpdate = (url) => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const updateData = async (id, data) => {
        setIsPending(true);
        setError(null);

        try {
            const response = await axios.put(`${url}/${id}`, data); // or axios.patch
            setIsPending(false);
            return response.data; // Return the response data if needed
        } catch (err) {
            setIsPending(false);
            setError(err.message);
            throw err;
        }
    };

    return { updateData, isPending, error };
};

export default useUpdate;
