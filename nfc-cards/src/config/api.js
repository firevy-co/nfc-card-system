const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const envApiUrl = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL = (envApiUrl && (isLocal || !envApiUrl.includes('localhost'))) 
    ? envApiUrl 
    : 'https://cardynnn.onrender.com';
