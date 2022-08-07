import { Request, Response } from "express";
import { connection } from "../data/connection";
import { typeDevices } from "../types/devices";
import { erros, showErrors } from "../types/erros";
import { validaType } from "../types/customValidacao";
import emailvalidator from "email-validator";
import { v4 as uuidv4 } from 'uuid';
import { institution } from "../types/institution";

export const newDonation = async(req: Request,res: Response): Promise<void> =>{

    try {
       
        const {
            name, email, phone, zip, city, state, streetAddress, number, complement, neighborhood, deviceCount, devices
        } = req.body;

        //Validação de itens recebidos no body

        if(
            !name || !phone || !zip || !city || !state || !streetAddress || !number || !neighborhood || !deviceCount || !devices
        ) {
            throw new Error(erros.MISSING_PARAMETERS.errorMessage)
        }

        //Validação de campos vazios / não vazios
        const atributo = [name, phone, zip, city, state, streetAddress, number, neighborhood]
        for(let element of atributo) {
            if (element === "" || element === " "){
                throw new Error(erros.MISSING_PARAMETERS.errorMessage)
            }
        }

        //validação do formato do email

        if(email && !emailvalidator.validate(email)){
            throw new Error(erros.INVALID_EMAIL.errorMessage)
        }

        //validação da quantidade informada/recebida de equipamentos

        if(devices.length !== deviceCount) {
            throw new Error(erros.WRONG_AMOUNT.errorMessage)
        }

        //validação do type de equipamentos
        for(let element of req.body.devices){
            if (validaType(element.type, element.condition) === false) {
                throw new Error(erros.WRONG_TYPES.errorMessage)
            }
        }

        const institutionID: string = uuidv4()

        const newDonation: institution = {
            id: institutionID,
            name,
            email,
            phone,
            zip,
            city,
            state,
            street_address: streetAddress,
            number,
            complement,
            neighborhood,
            device_count: deviceCount
        }

        await connection('institutions').insert(newDonation);

        //Inserção de novo cadastro no banco (equipamentos)
        
        for(let element of req.body.devices){
            const newDevice: typeDevices = {
                id: uuidv4(),
                institution_id: institutionID,
                type_device: element.type,
                condition_device: element.condition,
                name
            }
            await connection('devices').insert(newDevice);
        }

        res.status(200).send({success:true})

    } catch (error) {
        showErrors(res, error);
    }
};
