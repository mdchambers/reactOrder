import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burg-ef223.firebaseio.com/',
});

export default instance;