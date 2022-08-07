export const erros: {[key: string]: {status: number, error: boolean, requiredFields: string[], errorMessage: string}} = {
    WRONG_TYPES: {status: 400, error: true,  requiredFields:[], errorMessage: `O tipo informado de equipamentos ({$devices}) não é suportado; verificar documentação.`},
    NOT_FOUND: {status: 400, error: true,  requiredFields:[], errorMessage: `Nenhum usuário cadastrado no banco de dados.`},
    WRONG_AMOUNT: {status: 400, error: true,  requiredFields:[], errorMessage: `A quantidade de equipamentos ({$deviceCount}) não está de acordo com as informações de equipamentos enviados ({$sentDevices}).`},
    INVALID_EMAIL: {status: 400, error: true, requiredFields:["email"], errorMessage: "Email informado está em formato inválido."},
    MISSING_PARAMETERS: {status: 400, error: true, requiredFields: ["name, email, phone, zip, city, state ..."], errorMessage: "Todos os campos obrigatórios devem ser informados"},
    SOME_ERROR: {status: 500, error: true,  requiredFields:[], errorMessage: "Algo deu errado."}
};

export const showErrors = (res: any, error: any) => {
    switch (error.message) {
        case erros.NOT_FOUND.errorMessage:
            res.status(erros.NOT_FOUND.status).send(erros.NOT_FOUND)
            break;
        case erros.WRONG_TYPES.errorMessage:
            res.status(erros.WRONG_TYPES.status).send(erros.WRONG_TYPES)
            break;
        case erros.WRONG_AMOUNT.errorMessage:
            res.status(erros.WRONG_AMOUNT.status).send(erros.WRONG_AMOUNT)
            break;
        case erros.INVALID_EMAIL.errorMessage:
            res.status(erros.INVALID_EMAIL.status).send(erros.INVALID_EMAIL)
            break;
        case erros.MISSING_PARAMETERS.errorMessage:
           res.status(erros.MISSING_PARAMETERS.status).send(erros.MISSING_PARAMETERS)
            break;
        default:
            res.status(erros.SOME_ERROR.status).send(erros.SOME_ERROR)
            break;
    };
}

