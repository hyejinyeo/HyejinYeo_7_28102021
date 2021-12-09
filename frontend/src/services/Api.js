import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: process.env.PORT || 'http://localhost:3000/',
    })
}