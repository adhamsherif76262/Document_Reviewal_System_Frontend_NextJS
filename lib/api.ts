// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   withCredentials: true, // if using cookies
// });

// api.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("auth_token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // IMPORTANT: send cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// ❌ remove any token interceptors — cookies handle auth automatically

export default api;
