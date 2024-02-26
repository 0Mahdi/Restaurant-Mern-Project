import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { refetch, data: isAdmin, isLoading: isAdminLoading, error: isAdminError } = useQuery({
        queryKey: ['isAdmin', user?.email], // Changed the order of items in the queryKey
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`users/admin/${user?.email}`);
                return res.data?.admin;
            } catch (error) {
                throw new Error(error.response?.data?.message || 'Failed to fetch admin status');
            }
        },
        enabled: !!user?.email, // Only enable the query when user email is available
    });

    return [isAdmin, isAdminLoading, isAdminError, refetch];
};

export default useAdmin;






// import React from 'react';
// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

// const useAdmin = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
    
//     const { refetch, data: isAdmin, isPending: isAdminLoading, error: isAdminError } = useQuery({
//         queryKey: ['isAdmin', user?.email], // Changed the order of items in the queryKey
//         queryFn: async () => {
//             try {
//                 const res = await axiosSecure.get(`users/admin/${user?.email}`);
//                 return res.data?.admin;
//             } catch (error) {
//                 throw new Error(error.response?.data?.message || 'Failed to fetch admin status');
//             }
//         },
//         enabled: !!user?.email, // Only enable the query when user email is available
//     });

//     return [isAdmin, isAdminLoading, isAdminError, refetch];
// };

// export default useAdmin;


// import React from 'react'
// import useAuth from './useAuth'
// import useAxiosSecure from './useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

// const useAdmin = () => {
//     const {user} = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const { refetch, data: isAdmin, isPending: isAdminLoading} = useQuery({
//         queryKey: [user?.email, 'isAdmin'],
//         queryFn: async () => {
//            const res = await axiosSecure.get(`users/admin/${user?.email}`)
//            console.log(res.data)
//             return res.data?.admin;
//         }
//     })
  
//     return [isAdmin, isAdminLoading]
// }

// export default useAdmin;