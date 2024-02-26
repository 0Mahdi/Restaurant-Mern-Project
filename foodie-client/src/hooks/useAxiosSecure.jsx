import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:6001',
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await logOut();
            navigate("/login", { replace: true });
            // Display a notification or message to the user about the reason for logout
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;



// import axios from "axios";
// import {useNavigate} from "react-router-dom"
// import useAuth from "./useAuth";

// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:6001',
// })

// const useAxiosSecure = () => {
//     const navigate = useNavigate();
//     const {logOut} = useAuth();

//     axiosSecure.interceptors.request.use(function (config) {
//         // Do something before request is sent
//         const token = localStorage.getItem('access-token');
//         config.headers.authorization =`Bearer ${token}`
//         return config;
//       }, function (error) {
//         // Do something with request error
//         return Promise.reject(error);
//       });

// // Add a response interceptor
//       axiosSecure.interceptors.response.use(function (response) {
//         return response;
//       }, async (error) => {
//       const status = error.response.status;

//       if(status === 401 || status === 403 ){
//         await logOut();
//         navigate("/login")
//       }
//         return Promise.reject(error);
//       });

//   return axiosSecure
// }

// export default useAxiosSecure;