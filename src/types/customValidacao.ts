import { connection } from "../data/connection";

//validação type de equipamentos

export const validaType = (type: string, condition: string): boolean => {

    if((type.toLowerCase() === "notebook"
        || type.toLowerCase() === "desktop"
        || type.toLowerCase() === "netbook"
        || type.toLowerCase() === "screen"
        || type.toLowerCase() === "printer"
        || type.toLowerCase() === "scanner"
    ) && (
        condition.toLowerCase() === "working"
        || condition.toLowerCase() === "notworking"
        || condition.toLowerCase() === "broken"
    )) {
        return true
    }
    return false
}