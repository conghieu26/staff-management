const BASE_URL = "https://665f0fd11e9017dc16f2a755.mockapi.io/api";

const fetchApi = (url, otps) => {
  return fetch(`${BASE_URL}/${url}`, {
    ...otps,
    headers: {
      "Content-Type": "application/json",
      ...otps.headers,
    },
  });
};

export default fetchApi;
