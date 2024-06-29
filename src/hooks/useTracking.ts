import { useQuery, useMutation } from "@tanstack/react-query"
import { createTrackingRequest, deleteTrackingRequest, getAllTrackingsRequest, getTrackingByIdRequest, updateTrackingRequest } from "../api/tracking"
import { Track } from "../interfaces/Track";
import { queryClient } from "../main";

type UpdateProps = {
    tracking: Track, 
    id: number
}

export const useTracking = () => {
    const { data, isLoading, refetch } = useQuery({ queryKey: ['all-trackings'], queryFn: () => getAllTrackingsRequest() });

    const { mutateAsync: createTracking } = useMutation({ 
        mutationFn: async (tracking: Track) => await createTrackingRequest(tracking),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-trackings'] })
    });

    const { mutateAsync: getTrackingById } = useMutation({ mutationFn: async (id: number) => await getTrackingByIdRequest(id) });

    const { mutateAsync: deleteTracking } = useMutation({ 
        mutationFn: async (id: number) => await deleteTrackingRequest(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-trackings'] })
    });

    const { mutateAsync: updateTracking } = useMutation({ 
        mutationFn: async ({ tracking, id }: UpdateProps) => await updateTrackingRequest(tracking, id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-trackings'] })
    });

    return {
        trackings: {
            data, isLoading, refetch
        },
        createTracking,
        getTrackingById,
        deleteTracking,
        updateTracking
    }
}