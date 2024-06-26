export interface IVehicle {
    id: number,
    vehicleName: string,
    vehiclePlate: string,
    description?: string
}

export type Vehicle = Omit<IVehicle, 'id'>;