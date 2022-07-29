import { Request, Response } from "express"
import { DEVICE, STATEDEVICE } from "../types/devices";

const erros: {[key: string]: {status: number, requiredFields: string[], message: string}} = {
    WRONG_TYPES: {status: 400, requiredFields:[], message: `O tipo informado de equipamentos ({$devices}) não é suportado; verificar documentação.`},
    WRONG_AMOUNT: {status: 400, requiredFields:[], message: `A quantidade de equipamentos ({$deviceCount}) não está de acordo com as informações de equipamentos enviados ({$sentDevices}).`},
    INVALID_EMAIL: {status: 400, requiredFields:["email"], message: "Email informado está em formato inválido."},
    MISSING_PARAMETERS: {status: 400, requiredFields: [
        "name",
        "phone",
        "zip",
        "city",
        "state",
        "streetAddress",
        "number",
        "complement",
        "neighborhood",
        "deviceCount",
        "devices"
    ], message: "Todos os campos obrigatórios devem ser informados"},
    SOME_ERROR: {status: 500, requiredFields:[], message: "Algo deu errado."}
};

const showErrors = (res: any, error: any) => {
    switch (error.message) {
        case erros.WRONG_TYPES.message:
            res.status(erros.WRONG_TYPES.status).send(erros.WRONG_TYPES.message)
            break;
        case erros.WRONG_AMOUNT.message:
            res.status(erros.WRONG_AMOUNT.status).send(erros.WRONG_AMOUNT.message)
            break;
        case erros.INVALID_EMAIL.message:
            res.status(erros.INVALID_EMAIL.status).send(`${erros.INVALID_EMAIL.requiredFields} , ${erros.INVALID_EMAIL.message}`)
            break;
        case erros.MISSING_PARAMETERS.message:
            res.status(erros.MISSING_PARAMETERS.status).send(`${erros.MISSING_PARAMETERS.requiredFields} , ${erros.MISSING_PARAMETERS.message}`)
            break;
        default:
            res.status(erros.SOME_ERROR.status).send(erros.SOME_ERROR.message)
            break;
    };
}

export const getPrimeiraRota = (req: Request,res: Response): void => {

    try {

        const valor: {} = {alive: true}

        res.status(200).send(valor)

    } catch (error) {
        showErrors(res, error);
    }
};

export const newDonation = async(req: Request,res: Response): Promise<void> =>{

    try {
       
        const {
            name, email, phone, zip, city, state, streetAddress, number, complement, neighborhood, deviceCount, devices
        } = req.body;

        //Validação de itens recebidos no body

        if(
            !name || !phone || !zip || !city || !state || !streetAddress || !number || !complement || !neighborhood || !deviceCount || !devices
        ) {
            throw new Error(erros.MISSING_PARAMETERS.message)
        }

        //validação do formato do email

        const validaEmail = (email: string): boolean => {
            const re: RegExp = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        if(!validaEmail(email)){
            throw new Error(erros.INVALID_EMAIL.message)
        }

        //validação da quantidade informada/recebida de equipamentos

        if(devices.length !== deviceCount) {
            throw new Error(erros.WRONG_AMOUNT.message)
        }

        //validação do type de equipamentos

        if(devices.item !== DEVICE || devices.state !== STATEDEVICE){
            throw new Error(erros.WRONG_TYPES.message)
        }

        res.status(200).send({success:true})

    } catch (error) {
        showErrors(res, error);
    }
};
