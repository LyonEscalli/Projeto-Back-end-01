import { Request, Response } from "express";
import { showErrors } from "../types/erros";

export const getPrimeiraRota = (req: Request,res: Response): void => {

    try {

        const valor: {} = {alive: true}

        res.status(200).send(valor)

    } catch (error) {
        showErrors(res, error);
    }
};

