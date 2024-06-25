export interface ITrack {
    id: number,
    vehicleName: string,
    vehiclePlate: string,
    description?: string
}

export type Track = Omit<ITrack, 'id'>