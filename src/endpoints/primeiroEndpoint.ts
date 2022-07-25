import { Request, Response } from "express"

const erros: {[key: string]: {status: number, message: string}} = {
    SOME_ERROR: {status: 500, message: "Algo deu errado."}
};

const showErrors = (res: any, error: any) => {
    switch (error.message) {
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