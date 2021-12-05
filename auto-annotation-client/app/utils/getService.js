import axios from 'axios';
import log from 'electron-log';

export default class ImgService {

  // HTTP GET request to get image detection results
  async getImage(params = {}) {
    log.info('Calling service for image detection results');
    const config = {
      ...this.Config,
      ...{
        method: 'get',
        url: 'http://127.0.0.1:5000/get',
        params,
      },
    };
    return axios(config);
  }
  // HTTP POST request to post annnotation changes to backend
  async postAnnotation(data = {}) {
    log.info('Calling service for post annotation change');
    const config = {
      ...this.Config,
      ...{
        method: 'post',
        url: 'http://127.0.0.1:5000/post',
        data,
      },
    };
    return axios(config);
  }
  // HTTP POST request for user signup
  async postSignup(data) {
    log.info('Calling service signup');
    const config = {
      ...this.Config,
      ...{
        method: 'post',
        url: 'http://127.0.0.1:5000/signup',
        data,
      },
    };
    return axios(config);
  }
  // HTTP POST request for user login
  async postLogin(data) {
    log.info('Calling service login');
    const config = {
      ...this.Config,
      ...{
        method: 'post',
        url: 'http://127.0.0.1:5000/login',
        data,
      },
    };
    return axios(config);
  }

}
