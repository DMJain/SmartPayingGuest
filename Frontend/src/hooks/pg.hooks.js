import { apiInstance } from '../api/index';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

// Hook to create a new PG
export const usePostPg = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({
            name,
            plot,
            street,
            city,
            state,
            country,
            pinCode,
            phoneNumber,
            price,
            amenities,
            description,
            images,
        }) => {
            const { data } = await apiInstance.post('/owner/property/create', {
                name,
                plot,
                street,
                city,
                state,
                country,
                pinCode,
                phoneNumber,
                price,
                amenities,
                description,
                images,
            });
            return data.data; // Assuming the data structure has a `data` property
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['PG']); // Invalidate the `PG` query
        },
        onError: (error) => {
            console.error('Error posting PG:', error);
        },
    });

    return mutation;
};

// Hook to get PGs by owner
export const UsegetPGByOwner = () => {
    return useQuery({
        queryKey: ['PG'],
        queryFn: async () => {
            try {
                const { data } = await apiInstance.get('/owner/property');
                if (data.status === 'success') {
                    return data.data || []; // Ensure a default empty array if `user` is undefined
                } else {
                    console.warn('Failed to fetch PGs:', data.message);
                    return []; // Return an empty array on failure
                }
            } catch (error) {
                console.error('Error fetching PGs:', error); // Handle errors
                return []; // Return an empty array on error
            }
        },
    });
};
