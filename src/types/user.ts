import { DEVICE, STATEDEVICE } from "./devices"

export type user = {
    name: string
    email: string
    phone: string
    zip: string
    city: string
    state: string
    streetAddress: string
    number: string
    complement: string
    neighborhood: string
    deviceCount: number
    devices: Array<[DEVICE|STATEDEVICE]>
}