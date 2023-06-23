import axios from 'axios';

const Api= axios.create({
  baseURL: `${process.env.api}`
});


export default Api;