import axios, { AxiosRequestConfig } from "axios";

export default async function ApiCaller<T>(opt: AxiosRequestConfig<T>) {
  try {
    const response = await axios(opt);

    return { status: true, data: response.data as T };
  } catch (error: any) {
    let message = "";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      // console.log('err res data', error.response.data);
      // console.log('err res status', error.response.status);
      // console.log('err res headers', error.response.headers);
      message = "error happen when response";
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      message = "error happen when request";
    } else {
      // Something happened in setting up the request that triggered an Error
      message = "some thing wrong happern";
    }
    message = "error config" + error.config;

    console.log(message);

    return { status: false, message };
  }
}
