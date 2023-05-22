import axios from 'axios';

const Api= axios.create({
  baseURL: `https://meroghar-rf5q.onrender.com`
});


export default Api;