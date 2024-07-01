import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfileRequest, updateUserProfilePictureRequest, updateUserProfileRequest } from "../api/user";
import { IUser } from "../interfaces/User";
import { queryClient } from "../main";
import { useAuth } from "../context/AuthContext";

export const useProfile = () => {
    const { isAuthenticated} = useAuth();
    const { data, isLoading, refetch } = useQuery({ queryKey: ['user-profile'], queryFn: getUserProfileRequest, enabled: isAuthenticated  });

    const { mutateAsync } = useMutation({ 
        mutationFn: (body: IUser) => updateUserProfileRequest(body), 
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user-profile']}) 
    });

    const { mutateAsync: updateProfilePicture } = useMutation({ 
        mutationFn: (picture: string | ArrayBuffer) => updateUserProfilePictureRequest(picture), 
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user-profile']}) 
    });

    return {
        profile: { 
            data, 
            isLoading, 
            refetch 
        },
        update: mutateAsync,
        updateProfilePicture
    }
}