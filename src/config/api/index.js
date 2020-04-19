import Axios from 'axios';

const baseUrl = 'https://api.github.com/';

export default class ApiCaller {
  static Get = (url = '', headers = {}) => {
    return Axios.get(`${baseUrl}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
      .then(res => res)
      .catch(err => err.response);
  };
}
