import { apiInstance } from '../api/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
            const { data } = await apiInstance.post('/user/property/create', {
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
            return data.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['PG'] });
        },
    });
    return mutation;
};
