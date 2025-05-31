"use strict";
const devises = [
    { nom: "Dollar", code: "Dol", symbole: "$", taux: 1 },
    { nom: "Euro", code: "Eur", symbole: "€", taux: 1.20 },
    { nom: "Livre", code: "Liv", symbole: "£", taux: 1.39 },
    { nom: "Yuan", code: "Yua", symbole: "¥", taux: 0.15 },
];
function genererListe(liste, _devises = devises) {
    _devises.forEach(devise => {
        const option = document.createElement('option');
        option.value = devise.code;
        option.text = `${devise.nom} - ${devise.symbole}`;
        liste.add(option);
    });
    return liste;
}
function getDevise(code, _devises = devises) {
    const devise = _devises.find(e => e.code === code);
    if (!devise)
        throw new Error(`Aucune devise trouvée pour le code : ${code}`);
    return devise;
}
function calculerResultat(montant, devise, convert) {
    if (devise.code !== "Dol")
        montant = montant / devise.taux;
    return montant * convert.taux;
}
function afficherResultat(div, result) {
    div.innerHTML = `<h1>${result}</h1>`;
}
const deviseInput = document.querySelector("#devise");
const convertInput = document.querySelector("#convert");
const montantInput = document.querySelector("#montant");
const btn = document.querySelector("#button");
const result = document.querySelector("#result");
genererListe(deviseInput);
genererListe(convertInput);
btn.addEventListener('click', () => {
    const montant = Number(montantInput.value);
    const devise = deviseInput.value;
    const convert = convertInput.value;
    afficherResultat(result, calculerResultat(montant, getDevise(devise), getDevise(convert)));
});
//# sourceMappingURL=main.js.map