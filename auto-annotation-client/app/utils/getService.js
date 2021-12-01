import axios from 'axios';
import log from 'electron-log';

export default class ImgService {

  async getImage(params={}) {
    log.info('Calling service authenticationo');
    const config = {
      ...this.Config,
      ...{
        method: 'get',
        url: `http://127.0.0.1:5000/get`,
        params,
      },
    };
    // const rsp = await axios(config);
    // return rsp.data;
    return axios(config);
  }
  async postAnnotation(data={}) {
    log.info('Calling service authenticationo');
    const config = {
      ...this.Config,
      ...{
        method: 'post',
        url: `http://127.0.0.1:5000/post`,
        data,
      },
    };
    // const rsp = await axios(config);
    // return rsp.data;
    return axios(config);
  }
  
}