import { app } from "./app";
import { getPrimeiraRota } from "./endpoints/getPrimeiraRota";
import { newDonation } from "./endpoints/postDonation";
import { getDonation, getInstitution, getDevicesById } from "./endpoints/getDonations";

//rota teste
app.get("/", getPrimeiraRota);

//rotas para doações
app.post("/donation", newDonation);
app.get("/donation", getDonation);
app.get("/donation/institutions", getInstitution);
app.get("/donation/:id/devices", getDevicesById);

module.exports = app