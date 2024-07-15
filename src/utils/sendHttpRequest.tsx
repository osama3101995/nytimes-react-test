import axios from "axios";

export const sendHttpRequest = async (url: string) => {
  return axios
    .get(url)
    .then(function (response: any) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};
