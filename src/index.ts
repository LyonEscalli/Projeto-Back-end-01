import { app } from "./app";
import { getPrimeiraRota, newDonation} from "./endpoints/primeiroEndpoint";

//rotas para usuários
app.get("/", getPrimeiraRota);
app.post("/donation", newDonation);

module.exports = app