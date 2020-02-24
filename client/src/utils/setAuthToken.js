import axios from 'axios';

const setAuthToken = token => {
    if(token){ // token from local storage
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token']; //delete from the global headers.
    }
};
export default setAuthToken;