import {AxiosInstance, AxiosRequestConfig} from "axios";
import axios from "axios";

export interface HttpService {
  GET<T>(path: string, config?: AxiosRequestConfig): Promise<T>;
  POST<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  PUT<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  DELETE<T>(path: string, config?: AxiosRequestConfig): Promise<T>;
}

export class DefaultHttpService implements HttpService {
  constructor(private client: AxiosInstance = axios.create()) {
  }

  GET<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(path, config).then(
      payload => payload.data,
      payload => Promise.reject(payload.response)
    ) as Promise<T>;
  }

  POST<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post(path, data, config).then(
      payload => payload.data,
      payload => Promise.reject(payload.response)
    ) as Promise<T>;
  }

  PUT<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put(path, data, config).then(
      payload => payload.data,
      payload => Promise.reject(payload.response)
    ) as Promise<T>;
  }

  DELETE<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(path, config).then(
      payload => payload.data,
      payload => Promise.reject(payload.response)
    ) as Promise<T>;
  }
}
