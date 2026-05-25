const DEV_API_URL = 'http://localhost:5000/api';
const PROD_API_URL = 'https://photography-be.vercel.app/api';

export const API = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? DEV_API_URL : PROD_API_URL);
