import axios from "axios";

export class DefaultHttpService {
  constructor(client = axios.create()) {
    this.client = client;
  }

  GET(path, config) {
    return this.client.get(path, config).then(
      payload => payload.data,
      payload => Promise.reject(payload.response)
    );
  }

  POST(path, data, config) {
    return this.client.post(path, data, config).then(
      payload => payload.data,
      payload => Promise.reject(payload.response)
    );
  }

  PUT(path, data, config) {
    return this.client.put(path, data, config).then(
      payload => payload.data,
      payload => Promise.reject(payload.response)
    );
  }

  DELETE(path, config) {
    return this.client.delete(path, config).then(
      payload => payload.data,
      payload => Promise.reject(payload.response)
    );
  }
}
