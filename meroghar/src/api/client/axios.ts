import axios from 'axios';

const Api= axios.create({
  baseURL: `http://localhost:2900`
});


export default Api;