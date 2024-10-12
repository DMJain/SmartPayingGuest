import { apiInstance } from '../api/index';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

export const useCreatreRoom = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async ({ userId, ownerId, propertyId}) => {
        const { data } = await apiInstance.post("/chat/create-room", {
            userId,
            ownerId,
            propertyId,
        });

        return data;
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["chat"] });
      },
    });
    return mutation;
  };

  export const useGetUserChatRoom = () => {
    return useQuery({
        queryKey: ['PG'],
        queryFn: async () => {
            try {
                const { data } = await apiInstance.get('/chat/chat-rooms');
                if (data.status === 'success') {
                    return data.data || []; // Ensure a default empty array if `user` is undefined
                } else {
                    console.warn('Failed to fetch Chats:', data.message);
                    return []; // Return an empty array on failure
                }
            } catch (error) {
                console.error('Error fetching Chats:', error); // Handle errors
                return []; // Return an empty array on error
            }
        },
    });
};
