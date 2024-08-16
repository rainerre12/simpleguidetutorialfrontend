import { useState } from "react";
import axios from "axios";



const usePost = (url) => {
    const [isPending,setIsPending] = useState(false);
    const [error,setError] = useState(null);

    const postData = async (data) => {
        setIsPending(true);
        setError(null);

        try {
            await axios.post(url,data);
            setIsPending(false);
            
        } catch(err) {
            setIsPending(false);
            setError(err.message);
        }
    };

    return [postData,{isPending,error}];
}
 
export default usePost;