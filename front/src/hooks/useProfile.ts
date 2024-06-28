import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfileRequest, updateUserProfileRequest } from "../api/user";
import { IUser } from "../interfaces/User";
import { queryClient } from "../main";

export const useProfile = () => {
    const { data, isLoading, refetch } = useQuery({ queryKey: ['user-profile'], queryFn: getUserProfileRequest });

    const { mutateAsync } = useMutation({ 
        mutationFn: (body: IUser) => updateUserProfileRequest(body), 
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user-profile']}) 
    });

    return {
        profile: { 
            data, 
            isLoading, 
            refetch 
        },
        update: mutateAsync 
    }
}