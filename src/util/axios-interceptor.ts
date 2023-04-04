import axios, { AxiosBasicCredentials } from "axios";
// import { SERVER_API_URL } from 'app/config/constants';

axios.defaults.baseURL = "SERVER_API_URL";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

const setupAxiosInterceptors = () => {
  const onResponseSuccess = (response: any) => response;
  const onResponseError = (err: { status: any; response: { status: any } }) => {
    const status = err.status || (err.response ? err.response.status : 0);
    return Promise.reject(err);
  };

  axios.interceptors.request.use(
    (config) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const { username, password } = user;
        if (username && password) {
          config.auth.password = password;
          config.auth.username = username;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
