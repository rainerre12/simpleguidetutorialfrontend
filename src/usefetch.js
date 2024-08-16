import { cleanup } from '@testing-library/react';
import {useState,useEffect} from 'react';
import axios from 'axios';

const useFetch = (url,filterRemoveStatus = false) => {
    const[data, setData] = useState(null);
    const[isPending, setIsPending] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() =>{
        const source = axios.CancelToken.source();
        const fetchUrl = `${url}?filterRemoveStatus=${filterRemoveStatus}`;
        console.log(fetchUrl);
        setTimeout(() =>
        {
            axios.get(fetchUrl,{cancelToken: source.token})
                .then(response => {
                    setData(response.data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if(axios.isCancel(err)){
                        console.log('Request canceled',err.message);
                    }else
                    {
                        setIsPending(false);
                        setError(err.message);
                    }
                });
        },1000);
        return () => {
            source.cancel("Operation canceled by the user.");
        };
    },[url,filterRemoveStatus]);

    return { data,isPending,error }
}
export default useFetch;
