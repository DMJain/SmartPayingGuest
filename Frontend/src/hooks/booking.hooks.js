import { useMutation, useQueryClient, useQuery} from "@tanstack/react-query";
import { apiInstance } from "../api";

export const useCreatreBooking = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async ({ propertyId, date, paymentId}) => {
        const { data } = await apiInstance.post("/booking/createBooking", {
          propertyId,
            date,
            paymentId,
        });

        return data;
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["booking"] });
      },
    });
    return mutation;
  };



  export const useGetPropertyBooking = (id) => {
    return useQuery({
        queryKey: ['booking', id],
        queryFn: async () => {
            try {
                const { data } = await apiInstance.get(`/owner/property/${id}/bookings`);
                if (data.status === 'success') {
                    return data.data || []; // Ensure a default empty array if `user` is undefined
                } else {
                    console.warn('Failed to fetch Bookings:', data.message);
                    return []; // Return an empty array on failure
                }
            } catch (error) {
                console.error('Error fetching Bookings:', error); // Handle errors
                return []; // Return an empty array on error
            }
        },
    });
};

// export const useGetPropertyBooking = (id) => {
//   return useQuery({
//     queryKey: ['booking', id],
//     queryFn: async () => {
//       const { data } = await apiInstance.get(`owner/property/${id}/bookings`);
//       if (data.status === 'success') {
//         return data.data || []; // Ensure an empty array if no bookings
//       } else {
//         console.warn('Failed to fetch Bookings:', data.message);
//         return []; // Return an empty array on failure
//       }
//     },
//   });
// };