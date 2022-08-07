import { Request, Response } from "express";
import { connection } from "../data/connection";
import { erros, showErrors } from "../types/erros";

export const getDonation = async (req: Request,res: Response): Promise<void> => {

    try {

        const allDonations = await connection('devices').select();
        /*
        .orderBy("DESC") não está sendo utilizado, pois o id não está 
        sendo gerado automaticament pelo banco com AUTO_INCREMENT, 
        mas pela biblioteca uuid via código.

        */
        if(allDonations.length < 1) {
            throw new Error(erros.NOT_FOUND.errorMessage)
        }

        res.status(200).send(allDonations)

    } catch (error) {
        showErrors(res, error);
    }

};

export const getInstitution = async (req: Request,res: Response): Promise<void> => {

    try {

        const allInstitutions = await connection('institutions').select();

        if(allInstitutions.length < 1) {
            throw new Error(erros.NOT_FOUND.errorMessage)
        }

        res.status(200).send(allInstitutions)

    } catch (error) {
        showErrors(res, error);
    }

};

export const getDevicesById = async (req: Request,res: Response): Promise<void> => {

    try {

        const id = req.params.id;

        if(!id) {
            throw new Error(erros.MISSING_PARAMETERS.errorMessage)
        }
        
        const allDevices = await connection('devices')
        .where('institution_id', '=', id)
        .select();

        if(allDevices.length < 1) {
            throw new Error(erros.NOT_FOUND.errorMessage)
        }

        res.status(200).send(allDevices)

    } catch (error) {
        showErrors(res, error);
    }
};


