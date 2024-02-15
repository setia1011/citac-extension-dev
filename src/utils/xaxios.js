import axios from "axios";

const ciaxios = axios.create({
   baseURL: import.meta.env.DEV ? import.meta.env.VITE_DEV_BASE_URL_API : import.meta.env.VITE_PROD_BASE_URL_API
});

const imaxios = axios.create({
   baseURL: import.meta.env.DEV ? import.meta.env.VITE_DEV_BASE_URL_API_IMA : import.meta.env.VITE_PROD_BASE_URL_API_IMA
});

const coaxios = axios.create({
   baseURL: import.meta.env.DEV ? import.meta.env.VITE_DEV_BASE_URL_API_CITAC : import.meta.env.VITE_PROD_BASE_URL_API_CITAC
});

export {
   ciaxios,
   imaxios,
   coaxios
};