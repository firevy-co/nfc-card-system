const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const envApiUrl = import.meta.env.VITE_API_BASE_URL;

// If we have an env URL, use it. 
// Otherwise, use localhost for development or the production Render URL.
export const API_BASE_URL = envApiUrl || (isLocal ? 'http://localhost:4000' : 'https://cardynnn.onrender.com');

console.log(`[SYSTEM]: API Node established at ${API_BASE_URL}`);
