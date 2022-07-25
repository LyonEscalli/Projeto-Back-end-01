import { app } from "./app";
import { getPrimeiraRota} from "./endpoints/primeiroEndpoint";

//rotas para usuários
app.get("/", getPrimeiraRota);

module.exports = app